const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
// Before any tests run, clear the DB and run migrations with Sequelize sync()
beforeAll(async () => {});
/** Clean Db For Each Test  */
beforeEach(() => {
  return User.destroy({ truncate: true });
});
describe('User Registeration', () => {
  let ValidUser = {
    full_name: 'hossam yehia mohamed',
    email: 'hossamyahia1017@gmail.com',
    password: '01006907812',
    country_code: '+2',
    phone: '01006907813',
  };
  const PostUser = (user = ValidUser, options = { language: 'en' }) => {
    let agent = request(app).post('/api/Auth/Register');

    if (options.language) {
      agent.set('accept-language', options.language);
    }
    return agent.send(user);
  };
  it('returns 200 ok  when singup  request is valid', async () => {
    const response = await PostUser();
    expect(response.status).toBe(200);
  });
  // it('Return Success Message When SignUp Request Is Valid', async () => {
  //   let response = await PostUser();
  //   expect(response.body.message).toBe('User Created Successfully');
  // });
  it('Save User To DataBase', async () => {
    await PostUser();
    const users = await User.findAll();
    expect(users.length).toBe(1);
  });
  it('Save Full Username And Email And Phone And Country To DataBase', async () => {
    await PostUser();
    const users = await User.findAll();
    let SavedUser = users[0];
    expect(SavedUser.full_name).toBe('hossam yehia mohamed');
    expect(SavedUser.email).toBe('hossamyahia1017@gmail.com');
    expect(SavedUser.phone).toBe('01006907813');
    expect(SavedUser.country_code).toBe('+2');
  });
  it('Hash password in database', async () => {
    await PostUser();
    const users = await User.findAll();
    let SavedUser = users[0];
    expect(SavedUser.password).not.toBe('01006907812');
  });
  // it.each([
  //   ['full_name', 'missing fields'],
  //   ['email', 'missing fields'],
  //   ['phone', 'missing fields'],
  //   ['country_code', 'missing fields'],
  // ])('when %s is null %s is recived', async (field, expectedmessage) => {
  //   ValidUser.full_name = null;
  //   const response = await PostUser(ValidUser);
  //   const body = response.body;
  //   expect(response.status).toBe(400);
  //   expect(body.message).toBe(expectedmessage);
  // });

  // it('Return Email in use if email already used before', async () => {
  //   let user = {
  //     full_name: 'hossam yehia mohamed',
  //     email: 'hossamyahia1017@gmail.com',
  //     password: '01006907812',
  //     country_code: '+2',
  //     phone: '01006907813',
  //   };
  //   await User.create({ ...user });
  //   let response = await PostUser(user);
  //   expect(response.status).toBe(500);
  //   expect(response.body.message).toBe('Validation error');
  // });
  describe(`Internationalization English  `, () => {
    // let full_name_null_msg = 'يجب ادخال الاسم ';
    // let is_email_msg = 'يجب ادخال اميل صحيح';
    // let email_null_msg = 'يجب ٌدخال الاميل ';
    // let phone_null_msg = 'يجب آدخال الموبيل ';
    // let country_code_null_msg = 'رقم الدوله يجب ان يكون  به قيمه';

    let full_name_null_msg = 'Full Name Cannot be Empty';
    let is_email_msg = 'please enter valid email';
    let email_null_msg = 'Email Cannot be Empty';
    let phone_null_msg = 'Phone Cannot be Empty';
    let country_code_null_msg = 'country Code Cannot Be Null';
    it.each`
      Field             | value   | ExpectedMessage
      ${'full_name'}    | ${null} | ${full_name_null_msg}
      ${'email'}        | ${null} | ${email_null_msg}
      ${'phone'}        | ${null} | ${phone_null_msg}
      ${'country_code'} | ${null} | ${country_code_null_msg}
    `(
      'return $ExpectedMessage When $Field is Null',
      async ({ Field, ExpectedMessage, value }) => {
        ValidUser[Field] = value;
        const response = await PostUser(ValidUser, { language: 'en' });
        const body = response.body;
        expect(response.status).toBe(400);
        expect(body.validationErrors[Field]).toBe(ExpectedMessage);
      }
    );
    it('return message validation failer when validation not pass', async () => {
      ValidUser.email = null;
      let response = await PostUser(ValidUser, { lang: 'en' });
      expect(response.body.message).toBe('validation faliures');
    });
  });

  describe(`Internationalization arabic `, () => {
    let full_name_null_msg = 'يجب ادخال الاسم ';
    let is_email_msg = 'يجب ادخال اميل صحيح';
    let email_null_msg = 'يجب ٌدخال الاميل ';
    let phone_null_msg = 'يجب آدخال الموبيل ';
    let country_code_null_msg = 'رقم الدوله يجب ان يكون  به قيمه';
    it.each`
      Field             | value   | ExpectedMessage
      ${'full_name'}    | ${null} | ${full_name_null_msg}
      ${'email'}        | ${null} | ${email_null_msg}
      ${'phone'}        | ${null} | ${phone_null_msg}
      ${'country_code'} | ${null} | ${country_code_null_msg}
    `(
      'return $ExpectedMessage When $Field is Null when langauge is arabic',
      async ({ Field, ExpectedMessage, value }) => {
        ValidUser[Field] = value;
        const response = await PostUser(ValidUser, { language: 'ar' });
        const body = response.body;
        expect(response.status).toBe(400);
        expect(body.validationErrors[Field]).toBe(ExpectedMessage);
      }
    );
  });
  describe('Error Model', () => {
    it('return boolean status, message , validation error iside', async () => {
      let response = await PostUser({ ValidUser, full_name: null });
      expect(Object.keys(response.body)).toEqual([
        'status',
        'message',
        'validationErrors',
      ]);
    });
    it('return boolean status, message , data in case normal response ', async () => {
      let ValidUser = {
        full_name: 'hossam yehia mohamed',
        email: 'hossamyahia1017@gmail.com',
        password: '01006907812',
        country_code: '+2',
        phone: '01006907813',
      };
      const response = await PostUser(ValidUser, { language: 'en' });
      expect(Object.keys(response.body)).toEqual(['status', 'message', 'data']);
    });
  });
});
// afterAll(() => setTimeout(() => process.exit(), 1000))
