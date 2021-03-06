"""add has image bool to cards

Revision ID: 9c1a732a7764
Revises: fcc29948807c
Create Date: 2021-12-20 13:22:33.995793

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9c1a732a7764'
down_revision = 'fcc29948807c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cards', sa.Column('has_image', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('cards', 'has_image')
    # ### end Alembic commands ###
