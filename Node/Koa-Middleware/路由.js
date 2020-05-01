router.get('/user/:id', function(ctx,next){
    return User.findOne(ctx.params.id).then( (user) =>{
        ctx.user = user;
        return next();
    })

}, function(ctx){
    console.log(ctx.user);
})