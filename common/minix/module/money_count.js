export default {
	methods: {
		pirce_count(info,four = false){
			let price = 0,num = info.buy_num || 1,coupon = 0
			
			let coupon_type = four ? info.discountType-1 : info.coupon_type
			let coupon_num = four ? info.discountValue : info.coupon_num
			
			if(info.is_type === 1){
				let course_type = four ? info.productInfo.courseOrderType : info.courseOrderType
				let class_hour_price = four ? info.productInfo.classHourPrice : info.classHourPrice
				let month_price = four ? info.productInfo.monthPrice : info.monthPrice
				if(course_type === 0 || course_type === 1) price = class_hour_price * num || 0
				if(course_type === 2) price = month_price * num || 0
			}
			
			if(info.is_type === 2 || info.is_type === 3){
				let unit_price = four ? info.productInfo.price : info.price
				price = unit_price * num
			} 
			
			if(coupon_num > 0){
				const orgin_price = price
				let c_num = coupon_type === 0 || coupon_type === undefined ? (price - coupon_num) : price - (price * coupon_num / 100)
				price = c_num > 0 ? c_num : 0
				coupon = orgin_price - price
			}
			
			return [price,coupon]
		},
		for_all_price(one = true){
			let renew_list = this.renew_list,price = 0,coupon = 0
			for (let i = 0,j = renew_list.length;i < j; i++) {
				let r_list = renew_list[i]
				let list = r_list.is_list
				if(r_list.is_type === 4){
					for (let a = 0,b = list.length; a < b; a++) {
						let min_list = list[a].min_list
						for (let c = 0,d = min_list.length; c < d; c++) {
							let count = this.pirce_count(min_list[c],true)
							price += count[0]
							coupon += count[1]
						}
					}
				}else{
					for (let z = 0,k = list.length; z < k; z++) {
						let count = this.pirce_count(list[z])
						price += count[0]
						coupon += count[1]
					}
				}
			}
			this.put_money = price
			this.con_money = coupon
			//第一个页面renew_next的视图显示
			if(one){
				this.last_button_type = coupon > 0 ? 2 : 1
				this.$set(this.array_button[0],'num',`￥${price}`)
				this.$set(this.array_button[1],'num',`￥${coupon}`)
			}
		},
	},
}