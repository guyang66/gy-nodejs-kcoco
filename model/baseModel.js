const BaseSchema = {
	// 创建时间
	create_time: {
		type: Date,
		default: new Date()
	},
	// 最近一次修改时间
	last_modified_time: {
		type:Date,
		default: new Date()
	},
	// 创建人
	created_by: {
		type: String,
		default: ''
	},
	// 最近一次修改人
	last_modified_by: {
		type: String,
		default: new Date()
	},
	// 是否已作废
	is_deleted: {
		type: Boolean,
		default: false,
	}
}
module.exports = BaseSchema
