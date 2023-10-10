/**
 * 外贸营销邮件编辑器「商品」按钮
 */
(function() {
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  function registerCommand(editor) {
    // 打开选择商品弹窗
    editor.addCommand('appendProductAction', function() {
      var action = editor.getParam('appendProductAction');
      action && action();
    });
    // 打开功能介绍面板
    editor.addCommand('showProductTipAction', function() {
      var action = editor.getParam('showProductTipAction');
      action && action();
    });
  }

  function register(editor) {
    function exec(command) {
      return function() {
        editor.execCommand(command);
      };
    }
    editor.ui.registry.addButton('lxappendproduct', {
      text: 'Product',
      tooltip: '',
      beforeend:
        '<div style="font-size:10px;margin-left:2px;background:#FE5B4C;border-radius:2px;height:14px;text-align:center;color:#fff;line-height:13px;width:28px;">new</div>',
      icon: 'product',
      classes: ['lxappendproduct'],
      onAction: exec('appendProductAction')
    });
    editor.ui.registry.addButton('lxproducttip', {
      text: '',
      tooltip: '',
      icon: 'attention',
      onAction: exec('showProductTipAction')
    });
  }

  function plugin(params) {
    global.add('lxappendproduct', function(editor) {
      register(editor);
      registerCommand(editor);
    });
  }

  plugin();
})();
