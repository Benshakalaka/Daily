// html 模板示例:
// <div id="???" class="b-dialog" style="display:none;">
//     <div>
//         <input type="text" class="b-vague-search" style="height:19px; margin-top:3px;margin-left:4px;" placeholder="输入名称或编码"/>
//         <a class="easyui-linkbutton b-save-btn" iconCls="icon-ok">确定</a>
//         <a class="easyui-linkbutton b-cancel-btn" iconCls="icon-cancel">取消</a>
//     </div>
//     <div style="margin-top: 5px;height: 530px;overflow:auto">
//         <ul class="b-tree-container"></ul>
//     </div>
// </div>

/* 可配置选项:
 vagueAttrArray: [],							// 模糊查询的属性, 可以为字符串(默认子字符串查询), 可以为object, 指定属性以及筛选方式, 如下：['text', {name: 'code', filter: function(value, objectValue){}}]
 width: 300,									// 默认宽度
 height: 620,								// 默认高度
 title: 'B-Dialog',							// 弹出框title
 dataUrl: null,								// 弹窗数据请求url, 可在open时传入永久覆盖
 existedData: null,							// 初始传入已存在数据(String)
 existedTmeplate: '${text}(${code})',		// 已存在数据模板(目前必须存在code)
 existedSeparator: ',',						// 已存数据的分隔符
 compareToLowercase: true,					// 模糊查询进行默认字符串比较的时候是否要care大小写字母
 vagueDelay: 500								// 模糊查询频率(ms/次)
 filterNodes: function(node){}               // 判断该节点是否需要(比如不要父节点之类的)*/

/* 可注册事件
 注册方式：
 $(最外层元素).on('事件名', function(event){})
 事件类型:
 1. dialog.open.bdialog
 弹出框弹出后触发
 2. dialog.close.bdialog
 弹出框关闭后触发
 3. tree.filter.bdialog
 参与tree组件的loadFilter, 参数相当于 $('???').tree('getRoots') 的结果    获取参数方式：event.data2Address
 4. choose.filter.bdialog
 获取最终的checked nodes, 使用者可处理此数据, 控制返回结果， 参数即 $('???').tree('getChecked') 的结果      获取参数方式：event.nodes
 5. choose.complete.bdialog
 获取结果, 参数为根据模板生成的字符串    获取参数方式：event.finalresult
 */

/* 可调用事件
 调用方式：
 $('xxx').bdialog('???')
 事件类型：
 1. open : 打开   , 可带参数:  获取tree数据的 url
 2. vagueSearch: 模糊搜索,   参数： 模糊搜索的value
 3. save 确定按钮
 4. cancel  取消按钮
 */

+function ($) {

    var NAME = 'bdialog'
    var DATA_KEY = 'b.dialog'
    var ESSENTIAL_ATTR = ['code']

    var Selector = {
        // 最外层元素
        CONTAINER_ELE: 'b-dialog',
        // 模糊搜索框
        VAGUE_SEARCH_INPUT_ELE: '.b-vague-search',
        // 确定按钮
        SAVE_BTN_ELE: '.b-save-btn',
        // 取消按钮
        CANCEL_BTN_ELE: '.b-cancel-btn',
        // 树组件元素
        TREE_CONTAINER_ELE: '.b-tree-container'
    }

    var Event = {
        // 输入框触发模糊搜索的事件
        VAGUE_SEARCH_INPUT_EVENT: 'input',
        // 确定按钮
        SAVE_BTN_EVENT: 'click',
        // 取消按钮
        CANCEL_BTN_EVENT: 'click',
        // 弹出框弹出后触发
        DIALOG_OPEN_EVENT: 'dialog.open.bdialog',
        // 弹出框关闭后触发
        DIALOG_CLOSE_EVENT: 'dialog.close.bdialog',
        // 参与树组件数据的筛选
        TREE_DATA_FILTER: 'tree.filter.bdialog',
        // 参与确定按钮点击后数据筛选
        CHOOSE_FILTER_HANDLER: 'choose.filter.bdialog',
        // 在确定按钮点击后触发的按钮
        CHOOSE_COMPLETE_HANDLER: 'choose.complete.bdialog'
    }

    // 可配置属性默认值
    var Default = {
        // 最外层元素
        containerClass: Selector.CONTAINER_ELE,
        // 模糊查询的属性, 可以如下：['text', {name: 'code', filter: function(value, objectValue){}}]
        vagueAttrArray: [],
        // 默认宽度
        width: 300,
        // 默认高度
        height: 620,
        // 弹出框title
        title: 'B-Dialog',
        // 弹窗数据请求url
        dataUrl: null,
        // 初始传入已存在数据(String)
        existedData: null,
        // 已存在数据模板
        existedTmeplate: '${text}(${code})',
        // 已存数据的分隔符
        existedSeparator: ',',
        // 模糊查询进行默认字符串比较的时候是否要统一小写字母
        compareToLowercase: true,
        // 模糊查询频率(ms/次)
        vagueDelay: 500,
        // 获取符合要求的节点的函数
        filterNodes: null
    }

    // 构造函数
    function BDialog(element, options) {
        // 配置
        this.options = options
        // 容器元素
        var container = this.$container = $(element)
        // 搜索框元素
        this.$input = container.find(Selector.VAGUE_SEARCH_INPUT_ELE)
        // 确定按钮
        this.$saveBtn = container.find(Selector.SAVE_BTN_ELE)
        // 取消按钮
        this.$cancelBtn = container.find(Selector.CANCEL_BTN_ELE)
        // 树组件
        this.$treeContainer = container.find(Selector.TREE_CONTAINER_ELE)
        // 树的最原始数据(无checked属性)
        this._storedData = null
        // 所有 checked 数据, map, key为code
        this._existedData = null
        // 上一次模糊搜索出来的的checked数据
        this._previousData = null
        // 把最终数据字符串化的函数
        this._stringifyFromData = null

        this.setExistedData(this.options.existedData)
        this._addEventHandler()
    }

    // 模糊搜索
    BDialog.prototype.vagueSearch = function(value) {
        var _this = this
        // 初始化之前处理上次选中、取消选中
        _this._updataCheckedData(_this._existedData, _this._previousData, _this._getTreeCheckedData())

        // 开始用筛选后的数据重新初始化
        var newData = $.extend(true, [], _this._storedData)
        _this._vagueSearchFilter(newData, value)

        // 初始化
        _this._initTree(newData)
        _this._previousData = _this._getTreeCheckedData()
    };

    // 保存按钮
    BDialog.prototype.save = function() {

        // 最后一次修改后, 需要合并处理一下, 放在这里
        this._updataCheckedData(this._existedData, this._previousData, this._getTreeCheckedData())

        // 用户参与返回数据的筛选
        var data4User2Address = Util._map2array(this._existedData)
        var filterEvent = $.Event(Event.CHOOSE_FILTER_HANDLER, {
            nodes: data4User2Address
        })
        this.$container.trigger(filterEvent)

        this.cancel()

        // 用户获取最终数据处理
        var saveEvent = $.Event(Event.CHOOSE_COMPLETE_HANDLER, {
            finalresult: this._stringifyFromData(data4User2Address)
        })
        this.$container.trigger(saveEvent)
    };

    // 取消按钮
    BDialog.prototype.cancel = function() {
        this.$container.dialog('close')
    };

    // 重新设置初始化已存在数据
    BDialog.prototype.setExistedData = function (value) {
        var parseRet = Util._parseFromStr(value, this.options.existedTmeplate, this.options.existedSeparator, ESSENTIAL_ATTR)
        this.options.existedData = value
        this._existedData = Util._array2map(parseRet.result, 'code')
        this._stringifyFromData = parseRet._stringifyFromObj
    }

    // 手动打开弹出框
    BDialog.prototype.open = function (url) {
        var _this = this
        url && $.extend(_this.options, {
            dataUrl: url
        })
        _this.$container.show()
        _this.$container.dialog({
            title: _this.options.title,
            modal:true,
            maximizable:true,
            resizable:true,
            closed: false,
            onOpen: function () {
                _this.$input.focus()
                _this.$container.trigger(Event.DIALOG_OPEN_EVENT)
                $$.fillDialogWidthAndHeight(_this.$container.attr('id'), _this.options.width, _this.options.height)
                _this._initTree(null, _this.options.dataUrl)
            },
            onClose: function () {
                _this.$container.trigger(Event.DIALOG_CLOSE_EVENT)
            }
        })

        // 记录已选数据
        _this._previousData = $.extend(true, {}, _this._existedData)
    }

    // 初始化树组件
    BDialog.prototype._initTree = function (data, url) {
        var _this = this

        if(!data && !url) {
            return
        }

        var initObject = {
            animate : true,  //定义节点在展开或折叠的时候是否显示动画效果。
            lines : true,  //定义是否显示树控件上的虚线。
            //onlyLeafCheck: true,
            dnd: true,  //定义是否启用拖拽功能。
            multiple:true,
            checkbox : true,  //定义是否在每一个节点之前都显示复选框。
            loadFilter: function (data) {
                return _this._data2DisplayAddress($.extend(true, [], data))
            }
        }

        // 本地数据(搜索)
        if (data && !url) {
            initObject.data = data
            _this.$treeContainer.tree(initObject)
        } else {
            _this.$input.val('')
            $.ajax({
                type: 'POST',
                url: url,
                success: function(oData){
                    _this._storedData = oData
                    initObject.data = oData
                    _this.$treeContainer.tree(initObject)
                }
            })
        }
    }

    // 模糊搜索过滤
    BDialog.prototype._vagueSearchFilter = function (newData, value) {
        var _this = this
        search(newData, value)

        function search(newData, value) {
            for(var i = 0, k = 0; i < newData.length; i++) {
                var node = newData[i]
                // 文件夹节点不参与filter
                if (Object.prototype.hasOwnProperty.call(node, 'children')) {
                    arguments.callee(node.children, value)
                    newData[k++] = node
                } else if (_this._validateObject(value, node)) {
                    newData[k++] = node
                }
            }
            newData.length = k
        }
    }

    // 重新初始化树后默认选中一些之前选中的
    BDialog.prototype._data2DisplayAddress = function (newData) {
        // 处理数据
        this._treeDataChecked(newData)

        var loadDataEvent = $.Event(Event.TREE_DATA_FILTER, {
            data2Address: newData
        })
        this.$container.trigger(loadDataEvent)
        return newData
    }

    // 重新初始化树后默认选中一些之前选中的
    BDialog.prototype._treeDataChecked = function (newData) {
        var _this = this
        check(newData)

        function check(newData) {
            var node = null
            for(var i = 0; i < newData.length; i++) {
                node = newData[i]
                if(Object.prototype.hasOwnProperty.call(node, 'children')) {
                    arguments.callee(node.children)
                } else if ('code' in node && node.code in _this._existedData) {
                    node.checked = true
                }
            }
        }
    }

    // 获取树组件选中元素
    BDialog.prototype._getTreeCheckedData = function(){
        var allData = this.$treeContainer.tree('getChecked');
        var data = {}
        for(var i=0; i<allData.length; i++) {
            if (this.options.filterNodes) {
                this.options.filterNodes(allData[i]) && (data[allData[i].code] = allData[i])
            } else {
                data[allData[i].code] = allData[i]
            }
        }
        return data
    }

    /**
     * 原本选中： A,B,C,D
     * 模糊查询查出选中： A,B,C
     * 此次模糊查询操作后选中： B,C,E
     * 最终所有选中为: B,C,D,E
     **/
    BDialog.prototype._updataCheckedData = function(allData, prevData, currData) {
        // 取出新增元素： currData - prevData = addData
        var addNodes = objectMinus(currData, prevData)

        // 取出移除元素： prevData - currData = removeData
        var removeNodes = objectMinus(prevData, currData)

        // 处理所有: allData + addData - removeData
        for(var key in addNodes) {
            allData[key] = addNodes[key]
        }

        for(key in removeNodes) {
            delete allData[key]
        }

        // a - b = a有b无  (浅拷贝)
        function objectMinus(a, b) {
            var ret = {}
            for(var key in a) {
                if(Object.prototype.hasOwnProperty.call(a, key) && !Object.prototype.hasOwnProperty.call(b, key)){
                    ret[key] = a[key]
                }
            }
            return ret
        }
    }

    // 绑定一些基础事件
    BDialog.prototype._addEventHandler = function() {
        var _this = this
        this.$input.length > 0 && this.$input.on(Event.VAGUE_SEARCH_INPUT_EVENT, Util._delay(function () {
            _this.vagueSearch(_this.$input.val())
        }, _this.options.vagueDelay))
        this.$saveBtn.length > 0 && this.$saveBtn.on(Event.SAVE_BTN_EVENT, $.proxy(_this.save, _this))
        this.$cancelBtn.length > 0 && this.$cancelBtn.on(Event.CANCEL_BTN_EVENT, $.proxy(_this.cancel, _this))
    };

    // 对一个对象进行筛选, 根据给定的属性, 以及可能携带的该属性的验证方法
    BDialog.prototype._validateObject = function (value, object) {
        var _this = this, vagueAttrArray = this.options.vagueAttrArray
        var filter = null, toValidateAttr = null
        for (var i = 0; i < vagueAttrArray.length; i++) {
            toValidateAttr = vagueAttrArray[i]
            if (Object.prototype.toString.call(toValidateAttr) === '[object Object]') {
                filter = toValidateAttr.filter && Object.prototype.toString.call(toValidateAttr.filter) === '[object Function]' ? toValidateAttr.filter : null
            }
            filter = filter ? filter : defaultFilter

            if (filter(value, object[filter === defaultFilter ?　toValidateAttr : toValidateAttr.name])) {
                return true
            }
        }

        function defaultFilter(value, text) {
            if (_this.options.compareToLowercase) {
                return text.toLowerCase().indexOf(value.toLowerCase()) > -1
            } else {
                return text.indexOf(value) > -1
            }
        }

        return false
    }

    // jQuery初始化
    BDialog._jqueryInterface = function(config) {
        var _arguments = arguments
        return this.each(function () {
            var data = $(this).data(DATA_KEY)
            var _config = $.extend({}, Default, $(this).data())

            if (Object.prototype.toString.call(config) === '[object Object]') {
                $.extend(_config, config)
            }

            if (!data) {
                data = new BDialog(this, _config)
                $(this).data(DATA_KEY, data)
            }

            if (typeof config === 'string') {
                if(data[config] === undefined) {
                    throw new TypeError('no method named ' + config)
                }

                if (config === 'open' || config === 'vagueSearch') {
                    data[config](_arguments[1])
                } else {
                    data[config]()
                }
            }
        })
    }

    $.fn[NAME] = BDialog._jqueryInterface
    $.fn[NAME].Constructor = BDialog

}(jQuery)



var Util = {

    DELAY_INTERVAL: 200,

    // 延迟执行(一段时间内只执行一次)
    _delay: function (callback, interval) {
        interval = interval || this.DELAY_INTERVAL
        return (function (callback) {
            var timeout = null
            return function () {
                timeout && clearTimeout(timeout)
                var _this = this, _arguments = arguments
                timeout = setTimeout(function() {
                    callback && callback.apply(_this, _arguments)
                    timeout = null
                }, interval);
            }
        })(callback)
    },

    // 模板规则
    TEMPLATE_FORMAT_REGEXP: /\$\{(.+?)\}/g,
    /**
     * 根据模板解析字符串为Object
     * @param { String } value       要解析的                   '江苏无锡滨湖区蠡园公司(0020),江苏无锡南长区清扬公司(0029),江苏无锡锡山区八士镇公司(0030),江苏无锡惠山区阳山公司(0031)'
     * @param { String } template    模板                       '${text}(${id})'
     * @param { String } separator   分隔符                     ','
     * @param { Array } attrs        模板必须包含的属性数组       ['text', 'id']
     * @private
     */
    _parseFromStr: function (value, template, separator, attrs) {
        var parseRet = []

        // 校验模板是否合法(内部必须属性)
        for(var i=0; i<attrs.length; i++){
            if(template.indexOf('${' + attrs[i] + '}') === -1){
                throw new Error('Template Missing Attribute: ' + attrs[i])
            }
        }

        // 从value中获取的属性的顺序
        var attrMap = $.map(template.match(this.TEMPLATE_FORMAT_REGEXP), function (attrExtra) {
            return /\$\{(.*?)\}/.exec(attrExtra)[1]
        })

        // template生成的正则模板
        var regExp, currIndex = -1
            , lastIndex = 0, tempStr = '', singleObj = null
        regExp = regexpGenerator(template)

        while (1) {
            currIndex = value.indexOf(separator, lastIndex)
            tempStr = currIndex === -1
                ? value.substring(lastIndex)
                : value.substring(lastIndex, currIndex)

            singleObj = getDataFromString(tempStr, regExp, attrMap)
            singleObj && parseRet.push(singleObj)

            lastIndex = currIndex + 1
            if (currIndex === -1) {
                break
            }
        }

        // 根据生产的正则, 取出数据
        function getDataFromString(value, regExp, attrArray) {
            if(!value || value === '') {
                return null
            }

            var regRet = regExp.exec(value)
            if (regRet.length !== (attrArray.length + 1)) {
                return null
            }

            var ret = {}
            for (var i=1; i<regRet.length; i++) {
                ret[attrArray[i - 1]] = regRet[i]
            }
            return ret
        }

        // 生成正则表达式
        function regexpGenerator(template) {
            var regexpStr = '', len = template.length
                , tempMatch = null, toAddStr = ''
                , i = 0

            while (i < len) {
                var charAt = template[i]
                switch (charAt) {
                    case '$':
                        tempMatch = template.substr(i).match(/\$\{.+?\}/)
                        if (tempMatch && tempMatch.length > 0) {
                            toAddStr = '(.*?)'
                            while (template[++i] !== '}') {}
                        } else {
                            toAddStr = '\\' + charAt
                        }
                        break
                    case '(':
                    case ')':
                    case '\\':
                    case '[':
                    case ']':
                    case '{':
                    case '}':
                    case '.':
                    case '*':
                    case '+':
                    case '?':
                        toAddStr = '\\' + charAt
                        break
                    default:
                        toAddStr = charAt
                }
                regexpStr += toAddStr
                i++
            }

            return new RegExp(regexpStr)
        }

        return {
            result: parseRet,
            _stringifyFromObj: function (existedData) {
                var strList = $.map(existedData, function (data) {
                    return template.replace(/\$\{.+?\}/g, function ($1) {
                        return data[/\$\{(.*?)\}/.exec($1)[1]]
                    })
                })
                return strList.join(separator)
            }
        }
    },

    // 将object array转换为object
    _array2map: function (array, keyAttr) {
        var ret = {}
        for (var i=0; i<array.length; i++) {
            var obj = array[i]
            ret[obj[keyAttr]] = obj
        }
        return ret
    },

    // 将object转换为array
    _map2array: function (object) {
        var ret = []
        for(var key in object) {
            ret.push(object[key])
        }
        return ret
    }
}