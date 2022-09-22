const yup = require('yup');

const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
};

const loginSchema = yup.object({
    body: yup.object({
        username: yup.string().email().required(),
        password: yup.string().min(3).max(10).required(),
    }),
    params: yup.object({}),
});

const registerSchema = yup.object({
    body: yup.object({
        username: yup.string().required,
        password: yup.string().min(3).max(10).required(),
        email: yup.string().email(),
        fullName: yup.string().required(),
    }),
});

const productSchema = yup.object({
    params: yup.object({
        type: yup.number().min(0).max(10),
    }),
});

const supplierSchema = yup.object({
    body: yup.object({
      name: yup.string().required(),
      phone: yup.string().required(),
    }),
  });

module.exports = {
    validateSchema,
    productSchema,
    loginSchema,
    registerSchema,
    supplierSchema
};
