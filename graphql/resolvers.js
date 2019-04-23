const bcrypt = require("bcryptjs");
const Cours = require("../models/cours");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports = {
    cours: () => {
        return Cours.find().populate('creator').then(courses => {
            return courses.map(cours => {
                return {
                    ...cours._doc,
                    _id: cours._doc._id.toString() //cette ligne est faites juste pour caster le id renvoie au debut ...cours_doc
                }
            })
        }).catch(err => {
            console.log(err)
        });
    },
    createCours: (args) => {
        const cour = new Cours({
            title: args.coursinput.title,
            note: args.coursinput.note,
            date: Date.now(),
            creator: '5cb9d0694efdea35ce9412c1'
        });
        let createdcours;
        return cour.save().then(cour => {
            createdcours = {
                ...cour._doc
            };
            return User.findById(cour._doc.creator);
        }).then(user => {
            if (!user) {
                throw new Error('User does not exist');
            }
            user.courses.push(cour);
            return user.save();
        }).then(res => {
            return createdcours;
        }).catch(err => {
            console.error(err);
        });
    },

    createUser: (args) => {
        return User.findOne({
                email: args.userinput.email
            }).then((user) => {
                if (user) {
                    throw new Error("This mail is already used");
                }
                return bcrypt.hash(args.userinput.password, 12);
            })
            .then(hashedpass => {
                const user = new User({
                    email: args.userinput.email,
                    password: hashedpass
                });
                return user.save();
            }).then(user => {
                console.log(user._doc);
                return {
                    ...user._doc,
                    password: null
                }
            }).catch(err => console.log(err));

    },

    login: async ({
        email,
        password
    }) => {
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            throw new Error("This user does not exist");
        }
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            throw new Error("This is not the good password");
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, "fgfg4r54r58r5g", {
            expiresIn: '1h'
        });

        return {
            userId: user.id,
            token: token
        };
    }
}