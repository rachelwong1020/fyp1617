AccountsTemplates.configure({
    forbidClientAccountCreation: false,
    texts: {
        button: {
            signIn: "登入"
        },
        inputIcons: {
            //password: "lock_outline"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password"
        },
    },
});
var pwd = AccountsTemplates.removeField('password');
pwd.displayName = '密碼';
pwd.minLength = 4;
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "用戶名稱",
        required: true,
        minLength: 4,
        func: function(value){
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        },
    },
    pwd
]);