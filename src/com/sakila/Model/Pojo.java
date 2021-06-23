package com.sakila.Model;

public class Pojo {
	private Integer film_id;
	private Integer language_id;
	private String title;
	private String description;
	private String release_year;
	private String rating;
	private String language;
	private String director;
	private String special_features;
	private String config;
	private String film_id_string;

	public Integer getFilm_id() {
		return film_id;
	}
	public void setFilm_id(Integer film_id) {
		this.film_id = film_id;
	}
	public Integer getLanguage_id() {
		return language_id;
	}
	public void setLanguage_id(Integer language_id) {
		this.language_id = language_id;
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
	public String getRelease_year() {
		return release_year;
	}
	public void setRelease_year(String release_year) {
//		System.out.println("Hiiii"+release_year.substring(0,4));
		this.release_year = release_year.substring(0,4);

	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public String getSpecial_features() {
		return special_features;
	}
	public void setSpecial_features(String special_features) {
		this.special_features = special_features;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getDirector() {
		return director;
	}
	public void setDirector(String director) {
		this.director = director;
	}
	public String getConfig() {
		return config;
	}
	public void setConfig(String config) {
		this.config = config;
	}
	public String getFilm_id_string() {
		return film_id_string;
	}
	public void setFilm_id_string(String film_id_string) {
		this.film_id_string = film_id_string;
	}	


}
