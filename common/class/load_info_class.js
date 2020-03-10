class load_info_class {
	constructor() {
	    this.byid_obj = {}
	    this.is_update = true
	}
	
	set(args){
		if(args instanceof Object) Object.keys(args).forEach((key)=> this[key] = args[key])
	}
}

export default load_info_class