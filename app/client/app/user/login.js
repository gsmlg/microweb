        jQuery(function($){
            $('.modal form input').tooltip({placement:'right',
            trigger:'focus'});
            function alertMsg(msg,obj) {
                $('<div class="alert"><a class="close" data-dismiss="alert">°¡</a><strong>Ã· æ: </strong><span>'+msg+'</span></div>').appendTo(obj);
            };
            $('#loginModal .btn-primary').on('click', function(e){
                if (onposting) return;
                var onposting = onposting || true;
                var t = setTimeout(function(){ onposting = false; }, 5000);
                var form = $('#loginModal form'),
                    url = form.attr('action'),
                    data = form.serialize(),
                    flag = [];
                $.each(form.serializeArray(),function(key,data){
                    if (data.name == 'user[email]'){
                        var tmp = (/^[^\s@]+@[A-Za-z0-9-\.]+\.[A-Za-z]{2,5}$/.test(data.value)) && data.value.length < 120;
                        if (tmp) {
                            flag.push({name:'user[email]',validate:false});
                        } else {
                            flag.push({name:'user[email]',validate:true});
                        }
                    }
                    if (data.name == 'user[passwd]'){
                        var tmp = /^\S{8,30}$/.test(data.value);
                        if (tmp) {
                            flag.push({name:'user[passwd]',invalid:false});
                        } else {
                            flag.push({name:'user[passwd]',invalid:true});
                        }
                    }
                });
                if (flag.filter(function(obj){
                    if (obj.invalid) {
                        form.find('[name="'+obj.name+'"]').tooltip('show');
                        return true;
                    }
                    return false;
                }).length) {
                  return false;
                }
                $.post(url, data, function(data) {
                if (data.status === 0) {
                    alertMsg(data.message, form.find('.message'));
                    console.log(data.message);
                } else {
                    alertMsg(data.message, form.find('.message'));
                    window.User = data.user;
                    setTimeout(function(){
                        $('#loginModal').modal('hide');
                    }, 3000);
                    console.log(data.message);
                }
                clearTimeout(t);
                onposting = false;
                },'json');
            });
            $('#registModal .btn-primary').on('click', function(e){
                if (onposting) return;
                var onposting = onposting || true;
                var t = setTimeout(function(){ onposting = false }, 5000);
                var form = $('#registModal form'),
                    url = form.attr('action'),
                    data = form.serialize(),
                    flag = [];
                $.each(form.serializeArray(),function(key,data){
                    if (data.name == 'user[email]'){
                        var tmp = /^[^\s@]+@[A-Za-z0-9-\.]+\.[A-Za-z]{2,5}$/.test(data.value) && (data.value.length < 120);
                        if (tmp) {
                            flag.push({name:'user[email]',validate:false});
                        } else {
                            flag.push({name:'user[email]',validate:true});
                        }
                    }
                    if (data.name == 'user[passwd]'){
                        var tmp = /^\S{8,30}$/.test(data.value);
                        if (tmp) {
                            flag.push({name:'user[passwd]',invalid:false});
                        } else {
                            flag.push({name:'user[passwd]',invalid:true});
                        }
                    }
                    if (data.name == 'user[name]'){
                        var tmp = /^[^0-9]/.test(data.value) && /^[\u4e00-\u9fa5]{2,10}$|^\w{6,20}$/.test(data.value);
                        if (tmp) {
                            flag.push({name:'user[name]',invalid:false});
                        } else {
                            flag.push({name:'user[name]',invalid:true});
                        }
                    }
                });
                if (flag.filter(function(obj){
                    if (obj.invalid) {
                        form.find('[name="'+obj.name+'"]').tooltip('show');
                        return true;
                    }
                    return false;
                }).length) { return false; }
                $.post(url, data, function(data) {
                if (data.status === 0) {
                    alertMsg(data.message, form.find('.message'));
                } else if(data.status===1){
                    alertMsg(data.message, form.find('.message'));
                    setTimeout(function(){
                        $('#registModal').modal('hide');
                        $('#loginModal').modal('show');
                    }, 3000);
                }
                clearTimeout(t);
                onposting = false;
                },'json');
            });
        });
