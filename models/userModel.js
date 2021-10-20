import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		account: {
			username: {
				required: true,
				type: String,
			},
			phone: String,
			avatar: Object,
		},
		password: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassord) {
	return await bcrypt.compare(enteredPassord, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
