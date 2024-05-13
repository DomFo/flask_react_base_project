from api.models.user import UserModel, UserRole


def seed_admin():
    admin = UserModel(username='admin',
                      role=UserRole.ADMIN)
    admin.set_password('admin')
    admin.save_to_db()


def seed_regular_user():
    regular = UserModel(username='regular.user',
                        role=UserRole.USER)
    regular.set_password('password')
    regular.save_to_db()


def seed_all():
    seed_admin()
    seed_regular_user()
