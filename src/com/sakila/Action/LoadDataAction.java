package com.sakila.Action;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.sakila.Manager.FilmManager;

public class LoadDataAction {
		private Integer limit;
		private Integer start;
		private Object movieToJson;
		private Integer total;
		private Boolean success;
		private Integer film_id;
		private Integer language_id;
		private String title;
		private String description;
		private String release_year;
		private String rating;
		private String special_features;
		private String director;
		private String config;
		private Object data;
		private String film_id_string;

		/***
		 * fetch Data
		 * @return
		 * @throws Exception
		 */
		@SuppressWarnings("resource")
		public String addDataMethod() throws Exception {
			System.out.println("Hi");
			ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
			FilmManager filmManager=(FilmManager)context.getBean("FilmManager");
			setMovieToJson(filmManager.getAllFilms(start,limit));
			return "success";
		}
		/***
		 * add - edit functionality
		 * @return
		 * @throws Exception
		 */
		public String editDataMethod() throws Exception {
			@SuppressWarnings("resource")
			ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
			FilmManager filmManager=(FilmManager)context.getBean("FilmManager");
			System.out.println("add"+"--"+config+"--"+film_id+"--"+title+"--"+description+"--"+release_year+"=="+
			rating+"--"+special_features+"--"+director+"--"+language_id);
			setMovieToJson(filmManager.addData(config,film_id,title,description,release_year,rating,
					special_features,director,language_id));
			System.out.println("Done.add/edit");
			return "success";
		}
		/***
		 * search functionality
		 * @return
		 */
		public String searchDataMethod() throws Exception {
			@SuppressWarnings("resource")
			ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
			FilmManager filmManager=(FilmManager)context.getBean("FilmManager");
			setMovieToJson(filmManager.searchData(start,limit,title,release_year,director,language_id));
			System.out.println("Done.search");
			return "success";
		}
		/***
		 * delete functionality
		 * @return
		 */
		public String deleteDataMethod() throws Exception {
			@SuppressWarnings("resource")
			ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
			FilmManager filmManager=(FilmManager)context.getBean("FilmManager");
			setMovieToJson(filmManager.deleteData(film_id_string));
			System.out.println("Done..Delete");
			return "success";
		}
		
		/***
		 * getter-setter methods
		 * @return
		 */
		
		public Integer getLimit() {
			return limit;
		}
		public void setLimit(Integer limit) {
			this.limit = limit;
		}

		public Integer getStart() {
			return start;
		}

		public void setStart(Integer start) {
			this.start = start;
		}

		public Object getData() {
			return data;
		}

		public void setData(Object data) {
			this.data = data;
		}


		public Integer getTotal() {
			return total;
		}

		public void setTotal(Integer total) {
			this.total = total;
		}

		public Boolean getSuccess() {
			return success;
		}

		public void setSuccess(Boolean success) {
			this.success = success;
		}
		public String getConfig() {
			return config;
		}
		public void setConfig(String config) {
			this.config = config;
		}
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
			this.release_year = release_year;
		}
		public String getSpecial_features() {
			return special_features;
		}
		public void setSpecial_features(String special_features) {
			this.special_features = special_features;
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
		
		public String getFilm_id_string() {
			return film_id_string;
		}
		public void setFilm_id_string(String film_id_string) {
			this.film_id_string = film_id_string;
		}
		public Object getMovieToJson() {
			return movieToJson;
		}
		public void setMovieToJson(Object movieToJson) {
			this.movieToJson = movieToJson;
		}

	}
