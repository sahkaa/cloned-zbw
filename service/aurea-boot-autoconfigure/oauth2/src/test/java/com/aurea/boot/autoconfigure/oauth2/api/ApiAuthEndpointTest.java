package com.aurea.boot.autoconfigure.oauth2.api;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class ApiAuthEndpointTest {

    private final ConsumerTokenServices consumerTokenServices = mock(ConsumerTokenServices.class);

    private final MockMvc mockMvc = MockMvcBuilders.standaloneSetup(new ApiAuthEndpoint(consumerTokenServices))
            .addFilter(new SecurityContextPersistenceFilter()).build();

    @Test
    public void revokeToken() throws Exception {
        String tokenHeader = "tokenHeader";
        when(consumerTokenServices.revokeToken(tokenHeader)).thenReturn(true);
        mockMvc.perform(delete("/oauth/revoke-token")
                .header(AUTHORIZATION, tokenHeader))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
