class set_class {
	set_fun(args){
		if(args instanceof Object) Object.keys(args).forEach((key)=> this[key] = args[key])
	}
}

export default set_class