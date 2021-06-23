package com.sakila.Model;
import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;
@Entity
@Table(name = "film")
public class Film {
		@Id
		@Column(name = "film_id")
		private int film_id;

		@Column(name = "title")
		private String title;

		@Column(name = "description")
		private String description;

		@Column(name = "release_year")
		private int release_year;

		@Column(name = "director")
		private String director;

		@Column(name = "rating")
		private String rating;

		@Column(name = "special_features")
		private String special_features;
		
		@Column(name = "language_id")
		private Integer language_id;
		
		@ColumnDefault("0")
		@Column(name="is_Deleted")
		private Integer is_Deleted;
		
		public Integer getIs_Deleted() {
			return is_Deleted;
		}

		public void setIs_Deleted(Integer is_Deleted) {
			this.is_Deleted = is_Deleted;
		}

		public int getFilm_id() {
			return film_id;
		}

		public void setFilm_id(int film_id) {
			this.film_id = film_id;
		}

		public int getRelease_year() {
			return release_year;
		}

		public void setRelease_year(int release_year) {
			this.release_year = release_year;
		}

		public String getSpecial_features() {
			return special_features;
		}

		public void setSpecial_features(String special_features) {
			this.special_features = special_features;
		}

		public Integer getLanguage_id() {
			return language_id;
		}

		public void setLanguage_id(Integer language_id) {
			this.language_id = language_id;
		}
		// fetch = FetchType.LAZY
		// @ManyToOne(targetEntity = Language.class, cascade = CascadeType.PERSIST , fetch = FetchType.LAZY)

		@OneToOne(targetEntity = Language.class, cascade = CascadeType.ALL)
		@JoinColumn(name = "language_id", referencedColumnName="language_id", insertable = false, updatable = false)
		private Language languages;

		/*
		 * public Language getLanguages() { return languages; }
		 * 
		 * public void setLanguages(Language languages) { this.languages = languages; }
		 */

		private String language;
		public String getLanguage() {
			return languages.getName();
		}

		public void setLanguage(String language) {
			this.language = language;
		}
		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getDirector() {
			return director;
		}

		public void setDirector(String director) {
			this.director = director;
		}

		public String getRating() {
			return rating;
		}

		public void setRating(String rating) {
			this.rating = rating;
		}
}
