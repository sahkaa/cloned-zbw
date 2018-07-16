package com.aurea.boot.autoconfigure.mail.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@SuppressWarnings("PMD.AccessorMethodGeneration")
public class MailService {

    @NonNull
    private final JavaMailSender emailSender;

    public MailCompose compose() {
        return new MailCompose(this.emailSender, new SimpleMailMessage());
    }

    @RequiredArgsConstructor
    @SuppressWarnings("PMD.AbstractClassWithoutAbstractMethod")
    abstract class MailSenderMessage {
        protected final JavaMailSender emailSender;
        protected final SimpleMailMessage message;
    }

    public class MailCompose extends MailSenderMessage {

        protected MailCompose(JavaMailSender emailSender, SimpleMailMessage message) {
            super(emailSender, message);
        }

        public MailTo from(String from) {
            this.message.setFrom(from);
            return new MailTo(this.emailSender, this.message);
        }

        public class MailTo extends MailSenderMessage {

            protected MailTo(JavaMailSender emailSender, SimpleMailMessage message) {
                super(emailSender, message);
            }

            @SuppressWarnings("PMD.ShortMethodName")
            public MailSubject to(String... to) {
                this.message.setTo(to);
                return new MailSubject(this.emailSender, this.message);
            }

            public class MailSubject extends MailSenderMessage {

                protected MailSubject(JavaMailSender emailSender, SimpleMailMessage message) {
                    super(emailSender, message);
                }

                public MailContent subject(String subject) {
                    this.message.setSubject(subject);
                    return new MailContent(this.emailSender, this.message);
                }

                public class MailContent extends MailSenderMessage {

                    protected MailContent(JavaMailSender emailSender, SimpleMailMessage message) {
                        super(emailSender, message);
                    }

                    public MailSend content(String content) {
                        this.message.setText(content);
                        return new MailSend(this.emailSender, this.message);
                    }

                    public class MailSend extends MailSenderMessage {

                        protected MailSend(JavaMailSender emailSender, SimpleMailMessage message) {
                            super(emailSender, message);
                        }

                        public void send() {
                            this.emailSender.send(this.message);
                        }
                    }
                }
            }
        }
    }
}
