import { Schema } from "mongoose";
import { IUser, Role } from "../user/user.interface";
import { object } from "zod";

const userSchema = new Schema<IUser>({
    name:{type: String, required:true},
    email:{type: String, required:true, unique:true},
    password:{type: String},
    role:{type: String, enum: object.values(Role), default: Role.USER}
})