from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .decks import seed_decks, undo_decks
from .cards import seed_cards, undo_cards
from .deck_lists import seed_deck_lists, undo_deck_lists
from .badges import seed_badges, undo_badges
from .user_badges import seed_user_badges, undo_user_badges


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_badges()
    seed_user_badges()
    seed_categories()
    seed_decks()
    seed_cards()
    seed_deck_lists()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_badges()
    undo_user_badges()
    undo_categories()
    undo_decks()
    undo_cards()
    undo_deck_lists()
    # Add other undo functions here
