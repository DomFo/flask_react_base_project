import logging
from pathlib import Path

ROOT_PATH = Path(__file__).parent
LOG_DIR = ROOT_PATH / 'log'
log_path = LOG_DIR / 'dev.log'

LOG_DIR.mkdir(parents=True, exist_ok=True)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    '%(asctime)s - %(levelname)s - %(name)s in %(filename)s(Line: %(lineno)s): %(message)s')

file_handler = logging.FileHandler(log_path)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
