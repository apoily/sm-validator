SMValidator.config({
    requiredMessage: '这是必填字段',
    noServerMessage: '还没经过服务器验证',
    failHtml: '<span style="color:#c00;"></span>',
    failStyle: {
        color: '#c00',
        border: '1px solid #c00'
    },
    rules: {
        number: [/^-?\d+$/, '只能输入数字'],
        email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, '邮箱格式不正确'],
        range: function(val, a, b) {
            val = val * 1;
            //数值范围
            //range(a,b) 大于a小于b
            //range(a,) 大于a
            //range(,b) 小于b
            //range(a) 等于a
            var numberRegExp = /^-?\d+$/;
            if(numberRegExp.test(val)) {
                if((!a || numberRegExp.test(a)) || (!b || numberRegExp.test(b))) {
                    if(arguments.length === 2) {
                        return val == a || '值必须等于' + a;
                    }else if(arguments.length === 3){
                        if(a && b) {
                            return (val > a && val < b) || '值必须大于 ' + a + ' 且小于 ' + b;
                        }else if(a) {
                            return (val > a) || '值必须大于 ' + a;
                        }else if(b) {
                            return (val < b) || '值必须小于 ' + b;
                        }else {
                            return '无效参数';
                        }
                    }
                }else {
                    return '无效参数';
                }
            }else {
                return '不是数字';
            }
        },
        length: function(val, a, b) {
            //判断字符串长度范围，格式与range一致
            var n = val.length;
            if(arguments.length === 2) {
                return n == a || '长度必须等于' + a;
            }else if(arguments.length === 3){
                if(a && b) {
                    return (n > a && n < b) || '长度必须大于 ' + a + ' 且小于 ' + b;
                }else if(a) {
                    return (n > a) || '长度必须大于 ' + a;
                }else if(b) {
                    return (n < b) || '长度必须小于 ' + b;
                }else {
                    return '无效参数';
                }
            }
        },
        equal: function(val, targetSelector) {
            var target = document.querySelector(targetSelector);
            return val === target.value || '您输入的密码不一致';
        }
    }
});


var skins = {
    bootstrap: {
        failStyle: {}, //覆盖默认样式的值
        failHtml: ['!<span class="glyphicon glyphicon-remove form-control-feedback"></span>', '<small class="help-block"></small>'],
        failCss: '++has-error has-feedback',
        passHtml: '<span class="glyphicon glyphicon-ok form-control-feedback"></span>',
        passCss: '++has-success has-feedback'
    },
    semantic: {
        failStyle: {},
        failHtml: ['!<i class="remove icon"></i>', '+<small class="ui red pointing label"></small>'],
        failCss: '++error',
        passHtml: '<i class="checkmark icon"></i>',
    }
}

/**
 * 设置表单外观
 * @param {String} skin 以下值可填"bootstrap"
 */
SMValidator.setSkin = function(skin) {
    SMValidator.config(skins[skin]);
}