package com.aurea.boot.autoconfigure.data.user;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Email
    @NotEmpty
    @Column(nullable = false, unique = true)
    private String username;
    @JsonProperty(access = WRITE_ONLY)
    private String password;
    private String firstName;
    private String lastName;
    private String image;

    @Enumerated(EnumType.STRING)
    private UserStatus status;
    private boolean enabled;

    @JsonIgnore
    @Column(unique = true)
    private String resetPasswordToken;

}
