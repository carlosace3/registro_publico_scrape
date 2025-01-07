def upload_to_drive(service, file_path, folder_id):
    from googleapiclient.http import MediaFileUpload

    file_name = file_path.split("/")[-1]  # Extraer el nombre del archivo del path
    media = MediaFileUpload(file_path)

    file_metadata = {
        "name": file_name,
        "parents": [folder_id],  # Especificar la carpeta destino
    }

    uploaded_file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields="id",
    ).execute()

    print(f"File uploaded to Google Drive with ID: {uploaded_file.get('id')}")
