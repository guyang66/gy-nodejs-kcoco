const BaseSchema = {
	createTime: {
		type:Date,
		default: new Date()
	},
	modifyTime: {
		type:Date,
		default: new Date()
	},
	createId: {
		type: Number,
		default: 1
	},
	modifyId: {
		type: Number,
		default: 1
	},

	// 如果删除时，不是真的从数据库删除，则开启这个字段，删除的时候把isDelete字段标记为ture
	// 查询数据时则都带上isDelete:false，这样数据还有一层备份，万一出问题至少有迹可循
	isDelete: {
		type: Boolean,
		default: false,
	}
}
module.exports = BaseSchema
