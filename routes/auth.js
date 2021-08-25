var AuthController = require('../controller/AuthController');
const { checkRules, signupValidation } = require('../middlewares/validator');

module.exports = function (Authroutes) {
  /**
   * @swagger
   * /api/Auth/Register:
   *   post:
   *     description: Register the info of the user
   *     tags:
   *      - Auth
   *     parameters:
   *      - name: full_name
   *        in: formData
   *        required: true
   *        type: string
   *      - name: country_code
   *        in: formData
   *        required: true
   *        type: string
   *      - name: phone
   *        in: formData
   *        required: true
   *        type: string
   *      - name: email
   *        in: formData
   *        required: true
   *        type: string
   *      - name: password
   *        in: formData
   *        required: true
   *        type: string
   *        format: password
   *     responses:
   *       200:
   *         description: successfully signup the user info
   *       400:
   *         description: Error in validating the user info
   *
   */
  /**
   * @swagger
   * /api/Auth/SignIn:
   *   post:
   *     tags:
   *      - Auth
   *     description: User Sign In
   *     parameters:
   *      - name: email
   *        in: formData
   *        required: true
   *        type: string
   *      - name: password
   *        in: formData
   *        required: true
   *        type: string
   *        format: password
   *     responses:
   *       200:
   *         description: successfully signed in
   *       400:
   *         description: Error in returning the user info
   *
   */

  Authroutes.post(
    '/Register',
    signupValidation,
    checkRules,
    AuthController.Register
  );
  Authroutes.post('/SignIn', AuthController.signin);

  return Authroutes;
};
