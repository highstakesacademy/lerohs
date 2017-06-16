const app = new Vue({
    el: '#app',
    name: 'lero-hs',

    data: function () {
        return {
            text: ''
        };
    },

    computed: {
        charRemaining: function () {
            return 300 - (this.text.trim().length);
        }
    },

    methods: {
        sendText: function (event) {
            if (this.charRemaining < 300) {
                $.post('/dashboard', { 'phrase': this.text }, function (data, textStatus, xhr) {
                    if (xhr.status === 201) {
                        bootbox.alert({
                            message: 'é isso garoto(a), isso é só o começo',
                            size: 'small',
                            callback: function () {
                                window.location = window.location.href;
                            }
                        });
                    } else {
                        bootbox.alert({
                            message: 'opa! resiginifica o jogo e bola pra frente',
                            size: 'small'
                        });
                    }
                });
            } else {
                bootbox.alert({
                    message: 'recomendo fortemente que você digite alguma coisa.',
                    size: 'small'
                });
            }
        }
    }
});
