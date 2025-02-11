import React from "react";
import "./styles.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="main">

        
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2025 SENAI Roberto Mange. Todos os direitos reservados.</p>
                    <nav>
                        <a href="/sobre">Sobre</a>
                        <a href="/contato">Contato</a>
                        <a href="/privacidade">Política de Privacidade</a>
                    </nav>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="icon" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="icon" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="icon" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
