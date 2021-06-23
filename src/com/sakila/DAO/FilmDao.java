package com.sakila.DAO;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import com.sakila.Model.Pojo;

public interface FilmDao {
	public ArrayList<Pojo> retrievedata(int start,int limit) throws SQLException;
	public int retrievedataCount() throws SQLException;
	public boolean addData(String config,int film_id,String title,String description,String release_year,
			String rating,String special_features,String director,int language_id) throws SQLException;
	public boolean deleteData(String filmIds) throws SQLException;
	public Map<String,Object> searchData(int start,int limit,String title,
			String release_year,String director,Integer language_id) throws SQLException;
}
