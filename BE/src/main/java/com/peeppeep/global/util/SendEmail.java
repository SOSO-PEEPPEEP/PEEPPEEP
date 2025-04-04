package com.peeppeep.global.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Properties;

@Component
public class SendEmail {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.address}")
    private String senderEmail;
    @Value("${spring.mail.password}")
    private String senderPassword;

    public void sendEmail(String receiverEmail, String subject, String text) {
        JavaMailSenderImpl mailSender = (JavaMailSenderImpl) javaMailSender;
        mailSender.setUsername(senderEmail);
        mailSender.setPassword(senderPassword);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.debug", "true");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(receiverEmail);
        message.setFrom(senderEmail);
        message.setSubject(subject);
        message.setText(text);

        javaMailSender.send(message);
    }
}
