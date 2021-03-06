"""add profile photo to user

Revision ID: c891240eae36
Revises: 255bfb9e9cd0
Create Date: 2021-12-28 14:57:41.579725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c891240eae36'
down_revision = '255bfb9e9cd0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('has_image', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('profile_picture', sa.String(length=256), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_picture')
    op.drop_column('users', 'has_image')
    # ### end Alembic commands ###
