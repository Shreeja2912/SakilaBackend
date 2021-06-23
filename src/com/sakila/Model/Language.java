package com.sakila.Model;
import javax.persistence.*;

@Entity
@Table(name = "language")
public class Language {

		@Id
		@Column(name = "language_id")
		private Integer language_id;

		@Column(name = "name")
		private String name;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Integer getLanguage_id() {
			return language_id;
		}

		public void setLanguage_id(Integer language_id) {
			this.language_id = language_id;
		}


}
