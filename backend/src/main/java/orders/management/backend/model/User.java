package orders.management.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String name;
    private String firstLastName;
    private String secondLastName;
    
    @Indexed(unique=true)
    private String email;

}


