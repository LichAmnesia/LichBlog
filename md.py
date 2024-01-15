import os
import re
import shutil

def analyze_and_move_md_files():
    # Get all .md files in the current directory
    md_files = [f for f in os.listdir('.') if f.endswith('.md')]

    for file in md_files:
        try:
            # Try opening the file with UTF-8 encoding
            with open(file, 'r', encoding='utf-8') as f:
                contents = f.read()
        except UnicodeDecodeError:
            # If UTF-8 fails, try with 'gbk' encoding
            with open(file, 'r', encoding='gbk') as f:
                contents = f.read()

        # Use regular expression to find the date
        match = re.search(r'date: (\d{4})-\d{2}-\d{2} \d{2}:\d{2}:\d{2}', contents)
        if match:
            year = match.group(1)

            # Create a directory for the year if it doesn't exist
            if not os.path.exists(year):
                os.makedirs(year)

            # Move the file to the respective year folder
            shutil.move(file, os.path.join(year, file))

# Call the function
analyze_and_move_md_files()
