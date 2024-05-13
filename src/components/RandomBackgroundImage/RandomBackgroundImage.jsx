import React, { useState, useEffect } from 'react';

const RandomBackgroundImage = () => {
    const images = [
        "https://i.pinimg.com/736x/4f/31/2a/4f312aa213541fed49e46896076b8e40.jpg",
        "https://i.pinimg.com/736x/0c/96/7c/0c967c4af27aa805391e3be495936acd.jpg",
        "https://i.pinimg.com/564x/46/86/6a/46866a41aaf6e1b00ca993cac75cc538.jpg",
        "https://i.pinimg.com/736x/41/ba/b5/41bab523edbaacc3e30bbd5af394d4f7.jpg",
        "https://i.pinimg.com/564x/ae/8a/72/ae8a729755b6972dd3009467d82855dd.jpg",
        "https://i.pinimg.com/originals/66/4d/2a/664d2a0d4145a08503a0acfd5dd8366e.gif",
        "https://i.pinimg.com/564x/f1/14/c2/f114c2287b81b2f51f790eb9c90171e7.jpg",
        "https://i.pinimg.com/564x/21/5a/b0/215ab040b4f992553f47b86d5666f5be.jpg",
        "https://i.pinimg.com/564x/dd/37/30/dd3730e2b8e784667b49e736c6f51ca6.jpg",
        "https://i.pinimg.com/originals/79/a2/da/79a2daea48b8c41615da7abcb7c5f93c.gif",
        "https://i.pinimg.com/564x/cb/c9/47/cbc947de1d42a73d4bd230eeea972998.jpg",
        "https://i.pinimg.com/564x/60/25/b3/6025b3358f92e5f49315d4bb3d0398ed.jpg",
        "https://i.pinimg.com/originals/09/01/a4/0901a4175c540aecae983680e63cdd68.gif",
        "https://i.pinimg.com/564x/30/68/2f/30682fe6fcd187c686da274397125eec.jpg",
        "https://i.pinimg.com/736x/90/3c/70/903c70707c72f04a0f8d02019f9d6a07.jpg",
        "https://i.pinimg.com/736x/17/1f/82/171f8271819699cb3e0a17b971385bfc.jpg",
        "https://i.pinimg.com/originals/f0/fa/af/f0faafbd9ac022bb0f53a7439518b0f4.gif",
        
     
    ];

    // Sử dụng useState để thiết lập URL ban đầu và để thay đổi nó
    const [imageUrl, setImageUrl] = useState(images[0]);

    // Hàm để lấy một URL ngẫu nhiên từ mảng
    const getRandomImage = () => {
        const index = Math.floor(Math.random() * images.length);
        return images[index];
    };

    // Sử dụng useEffect để thay đổi ảnh khi component được mount
    useEffect(() => {
        setImageUrl(getRandomImage());
    }, []); // Chú ý: array rỗng để chỉ chạy một lần khi component mount

    return (
        <img
            src={imageUrl}
            alt="Ảnh bìa"
            className="img-fluid"
            style={{objectFit:'cover'}}
        />
    );
};

export default RandomBackgroundImage;
