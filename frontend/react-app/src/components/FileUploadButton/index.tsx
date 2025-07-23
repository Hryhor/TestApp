import React, { useRef, ChangeEvent, useState } from "react";
import ClipIcon from "../../app/assets/images/paperclip.svg";

interface FileUploadButtonProps {
    onFileSelect: (file: File) => void;
}

const MAX_TEXT_SIZE = 100 * 1024; // 100 KB
const MAX_IMG_WIDTH = 320;
const MAX_IMG_HEIGHT = 240;

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileButtonClick= () => {
        fileInputRef.current?.click();
    };

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (!file) return; 

            const fileType = file?.type;

            if (fileType?.startsWith("image/")) {
                if (!["image/jpeg", "image/png", "image/gif"].includes(fileType)) {
                    alert("Разрешены только изображения JPG, PNG или GIF.");
                    return;
                }

                const image = new Image();
                const reader = new FileReader();

                image.onload = () => {
                    const { width, height } = image;
          
                    if (width > MAX_IMG_WIDTH || height > MAX_IMG_HEIGHT) {
                        const scale = Math.min(
                            MAX_IMG_WIDTH / width,
                            MAX_IMG_HEIGHT / height
                        );
          
                        const canvas = document.createElement("canvas");
                        canvas.width = width * scale;
                        canvas.height = height * scale;
          
                        const ctx = canvas.getContext("2d");
                        if (!ctx) return;
          
                        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          
                        canvas.toBlob((blob) => {
                            if (blob) {
                                console.log("Изображение сжато и готово к отправке:", blob);
                                setFile(file)
                                onFileSelect(file);
                            }
                        }, fileType);
                    } else {
                      console.log("Размер изображения приемлем:", file);
                    }

                    setFile(file)
                    onFileSelect(file);
                    reader.readAsDataURL(file);
                }

                setFile(file);
                onFileSelect(file);
            }

            else if (fileType === "text/plain") {
                if (file.size > MAX_TEXT_SIZE) {
                    alert("Текстовый файл не должен превышать 100 KB.");
                    return;
                }
                setFile(file);
                onFileSelect(file);
            }
        
            else {
                alert("Разрешены только изображения (JPG/PNG/GIF) и текстовые файлы (TXT).");
            }
        }
    }
        
    return (
        <div>
            <button className="file-upload__btn" onClick={handleFileButtonClick} type="button">
                <img src={ClipIcon} className="clip-icon" alt="Clip" />
            </button>
            {
                file && (
                    <div className="file-upload">
                        <p className="file-upload__info">File name: {file?.name}</p>
                        <p className="file-upload__info">File size: {file?.size}</p>
                        <p className="file-upload__info">File type: {file?.type}</p>
                    </div>
                )
            }
            <input
                type="file"
                accept="image/jpeg,image/png,image/gif,text/plain,.jpg,.jpeg,.png,.gif,.txt"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={onChangeFile}
            />
        </div>
    );
};

export default FileUploadButton;
