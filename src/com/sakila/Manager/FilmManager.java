package com.sakila.Manager;

import java.util.HashMap;
import java.util.Map;

import com.sakila.DAO.FilmDao;

public class FilmManager {
	private FilmDao filmDao;
	public FilmDao getFilmDao() {
		return filmDao;
	}
	public void setFilmDao(FilmDao filmDao) {
		this.filmDao = filmDao;
	}
	public Map<String,Object> getAllFilms(int start, int limit){
		Map<String,Object> mapToJson;
		mapToJson=new HashMap<String,Object>();
		try{
			mapToJson.put("movies",filmDao.retrievedata(start,limit));
			mapToJson.put("total",filmDao.retrievedataCount());
			mapToJson.put("success",true);
			System.out.println("heeel"+mapToJson);
		}
		catch (Exception e1) 
		{
			e1.printStackTrace();
		}
		return mapToJson;
	}
	public Map<String,Object> addData(String config,int film_id,String title,String description,String release_year,
		String rating,String special_features,String director,int language_id){
		
		Map<String,Object> mapToJson=new HashMap<String,Object>();
		try{
			mapToJson.put("success",filmDao.addData(config,film_id,title,description,release_year,
					rating,special_features,director,language_id));
		}
		catch (Exception e1) 
		{
			e1.printStackTrace();
		}
		return mapToJson;
	}
	public Map<String, Object> deleteData(String film_id_string) throws Exception {
		Map<String,Object> mapToJson=new HashMap<String,Object>();
		try 
		{
			mapToJson.put("success",filmDao.deleteData(film_id_string));		
		}	
		catch (Exception e1) 
		{
			e1.printStackTrace();
		}
    System.out.println("Done..Delete");
	return mapToJson;
	}
	public Map<String, Object> searchData(int start,int limit,String title,String release_year,String director,Integer language_id) throws Exception {
		System.out.println("hello"+start+"-"+limit+"-"+title+"-"+release_year+"-"+director+"-"+language_id);
		Map<String,Object> mapToJson=new HashMap<String,Object>();
		try 
		{
			mapToJson.put("search",filmDao.searchData(start,limit,title,release_year,director,language_id));		
		}	
		catch (Exception e1) 
		{
			e1.printStackTrace();
		}
    System.out.println("Done..Search manager");
	return mapToJson;
	}
}
