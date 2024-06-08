import React, { useState, useEffect } from 'react';

const AESComponent = () => {
    const [key, setKey] = useState(null);
    const [iv, setIv] = useState(null);
    const [plaintext, setPlaintext] = useState('');
    const [ciphertext, setCiphertext] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    useEffect(() => {
        // Generate AES-GCM key on component mount
        const generateKey = async () => {
            const generatedKey = await crypto.subtle.generateKey(
                {
                    name: "AES-GCM",
                    length: 256,
                },
                true,
                ["encrypt", "decrypt"]
            );
            setKey(generatedKey);
        };
        generateKey();
    }, []);

    const handleEncrypt = async () => {
        const ivArray = crypto.getRandomValues(new Uint8Array(12));
        setIv(ivArray);

        const encoded = new TextEncoder().encode(plaintext);
        const encryptedBuffer = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: ivArray,
            },
            key,
            encoded
        );

        const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
        setCiphertext(encryptedBase64);
    };

    const handleDecrypt = async () => {
        try {
            const ciphertextArray = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
            const decryptedBuffer = await crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                key,
                ciphertextArray
            );

            const decryptedText = new TextDecoder().decode(decryptedBuffer);
            setDecryptedText(decryptedText);
        } catch (e) {
            console.error("Decryption failed", e);
        }
    };

    return (
        <div>
            <h2>Encryption and Decryption Example</h2>
            <textarea
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Enter text to encrypt"
                rows="4"
                cols="50"
            ></textarea><br />
            <button onClick={handleEncrypt}>Encrypt</button><br />
            <textarea
                value={ciphertext}
                readOnly
                placeholder="Encrypted text will appear here"
                rows="4"
                cols="50"
            ></textarea><br />
            <button onClick={handleDecrypt}>Decrypt</button><br />
            <textarea
                value={decryptedText}
                readOnly
                placeholder="Decrypted text will appear here"
                rows="4"
                cols="50"
            ></textarea>
        </div>
    );
};

export default AESComponent;