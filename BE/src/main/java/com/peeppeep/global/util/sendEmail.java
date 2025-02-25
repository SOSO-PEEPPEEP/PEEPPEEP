package com.peeppeep.global.util;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class sendEmail {

    private JavaMailSender javaMailSender;

    @Value("${spring.mail.email-address}")
    private String senderEmail;

    public void sendEmail(String receiverEmail, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(senderEmail);
        message.setFrom(receiverEmail);
        message.setSubject(subject);
        message.setText(text);

        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }
}
