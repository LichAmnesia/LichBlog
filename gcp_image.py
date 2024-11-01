from google.cloud import storage
import os


def upload_blob(bucket, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # For windows only
    destination_blob_name = destination_blob_name.replace('\\','/')
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print('File {} uploaded to {}.'.format(
        source_file_name,
        destination_blob_name))
    print(f'{url_prefix}{destination_blob_name}')

def find_all_files_with_prefix(local_prefix='public', prefix=''):
    name_list = os.listdir(os.path.join(local_prefix, prefix))
    ans_list = []
    for name in name_list:
        if os.path.isdir(os.path.join(local_prefix, os.path.join(prefix, name))):
            continue
            # ans_list.extend(find_all_files_with_prefix(local_prefix, os.path.join(prefix, name)))
        else:
            ans_list.append(os.path.join(prefix, name))
    return ans_list


# Instantiates a client
# Please set GOOGLE_APPLICATION_CREDENTIALS or explicitly create credentials and re-run the application. 
# credentials = '/Users/lich/Google Drive/Stock/lichamnesia-gcp-stockproject.json'
credentials = 'C:/Users/Lich/Google 云端硬盘/Stock/lichamnesia-gcp-stockproject.json'
storage_client = storage.Client.from_service_account_json(credentials)
bucket_name = 'lichamnesia.appspot.com'
bucket = storage_client.get_bucket(bucket_name)
local_prefix = 'images'
file_names = find_all_files_with_prefix(local_prefix)
url_prefix = 'https://storage.googleapis.com/lichamnesia.appspot.com/'

# source_file_name = 'path/to/your/image.jpg' # Replace with the path to your image file
# destination_blob_name = 'storage-object-name.jpg' # Replace with the desired object name in the bucket

for file_name in file_names:
    print(file_name)
    upload_blob(bucket, os.path.join(local_prefix, file_name), os.path.join(local_prefix, file_name))

# upload_to_gcs(bucket, source_file_name, destination_blob_name)
