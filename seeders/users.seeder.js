import { Seeder } from 'mongoose-data-seed';
import { User } from '../models/userModel';

const data = [
  {
    user_prefix: "Mr.",
    first_name: "Constantine",
    last_name: "Chutis",
    phone_number: "6312941908",
    city: "Middle Island",
    state: "NY",
    professional: false,
    email: "constantinec84@gmail.com",
    password: "123"
  }
];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;
