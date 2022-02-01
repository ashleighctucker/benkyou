"""add boolean to decks

Revision ID: fcc29948807c
Revises: 01b0de74e473
Create Date: 2021-12-19 17:30:44.832517

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fcc29948807c'
down_revision = 'f0429ff97a89'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('decks', sa.Column('has_image', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('decks', 'has_image')
    # ### end Alembic commands ###
