package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


/**
 * @author Yongjie Lyu
 * @date 2022-6-14
 */

@SpringBootApplication
public class SystemApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SystemApplication.class, args);
	}


}