package com.sakila.Connection;
import com.sakila.Connection.JdbcConnection;
import com.sakila.Model.Pojo;

import java.sql.Connection;
	import java.sql.PreparedStatement;
	import java.util.HashMap;
	import java.util.LinkedList;
	import java.util.Map;
	import java.sql.ResultSet;
	import java.sql.Statement;


	public class RetrieveData {
		
		/***
		 * Loading data in grid
		 * @param start
		 * @param limit
		 * @return
		 * @throws Exception
		 */
		public static LinkedList<Pojo> retrievedata(int start,int limit) throws Exception 
	    {
	    		   Connection conn = JdbcConnection.getConnectionInterface();
	    		   ResultSet rs;
	    		   LinkedList<Pojo> record=new LinkedList<>();
	    		   // Map<String,Object> mapToJson=new HashMap<>();
	    		   PreparedStatement stmt=null;
	    		   
	    		   try
	    		   {
	    		      String sql;
	    		      sql="SELECT film_id,`title`,`description`,`release_year`,`rating`,`special_features`,film.language_id,"
	    		      		+ "`director`,`name` AS 'language' FROM film JOIN `language` "
	    		      		+ "ON film.language_id=language.language_id limit ?,?";
	    		      stmt=conn.prepareStatement(sql);
	    		      stmt.setInt(1,start);
	    		      stmt.setInt(2,limit);	      
	    		      rs = stmt.executeQuery();
	    		      
	    		     
	    				while(rs.next()){
	    				Pojo pojo_obj =new Pojo();
	    				pojo_obj.setFilm_id(rs.getInt("film_id"));
	    				pojo_obj.setTitle(rs.getString("film.title"));
	    				pojo_obj.setDescription(rs.getString("film.description"));
	    				pojo_obj.setRelease_year(rs.getString("film.release_year"));
	    				pojo_obj.setRating(rs.getString("film.rating"));
	    				pojo_obj.setLanguage_id(rs.getInt("film.language_id"));
	    				pojo_obj.setLanguage(rs.getString("language"));
	    				pojo_obj.setDirector(rs.getString("film.director"));
	    				pojo_obj.setSpecial_features(rs.getString("film.special_features"));
	    				record.add(pojo_obj);
	    				}
	    				// rs2=RetrieveData.retrievedataCount();
	    				// if(rs2.next()){
	    				// total=rs2.getInt("COUNT(*)");
	    				// }
	    				// mapToJson.put("success",true);
	    				// mapToJson.put("total",total);
	    				// mapToJson.put("movies",record);
	    		   }
	    		   catch(Exception e) {
	    			   e.printStackTrace();
	    			   }
	   			 return record; 
	    		   }
		
		/***
		 * total records
		 * @return
		 * @throws Exception
		 */
		public static int retrievedataCount() throws Exception 
	    {
	    		   Connection conn = JdbcConnection.getConnectionInterface();
	    		   ResultSet rs=null;
	    		   PreparedStatement stmt=null;
	    		   int total=0;
	    		   try
	    		   {
	    		      
	    		      String sql2 = "SELECT COUNT(*) FROM film";
	    		      stmt=conn.prepareStatement(sql2);
	    		      rs = stmt.executeQuery();
	    		      if(rs.next())
	      				 total=rs.getInt("COUNT(*)"); 				 
	    		   }
	    		   catch(Exception e) {
	    			   e.printStackTrace();
	    			   }
	    		  
	   			 return total; 
	    }
		
		/***
		 * adding and editing records
		 * @param config
		 * @param film_id
		 * @param title
		 * @param description
		 * @param release_year
		 * @param rating
		 * @param special_features
		 * @param director
		 * @param language_id
		 * @return
		 * @throws Exception
		 */
		public static boolean addData(String config,int film_id,String title,String description,String release_year,
				String rating,String special_features,String director,int language_id) throws Exception 
	    {
	    		   Connection conn = JdbcConnection.getConnectionInterface();
	    		   PreparedStatement stmt=null;
	    		   boolean b=false;
	    		   try
	    		   {
	    		      String sql=null;
	    		      if(config.equalsIgnoreCase("Add"))
	    		      sql="Insert into film (title,description,release_year,rating,"
	    		      		+ "special_features,director,language_id) values(?,?,?,?,?,?,?)";
	    		      else if(config.equalsIgnoreCase("Edit"))
	    		      {
	    		    	  sql="Update film set title=?,description=?,release_year=?,rating=?,"
	    	    		      		+ "special_features=?,director=?,language_id=? where film_id=?";
	    		      }
	    		    	  
	    		      stmt=conn.prepareStatement(sql);
	    		      stmt.setString(1,title);	  
	    		      stmt.setString(2,description);
	    		      stmt.setString(3,release_year);
	    		      stmt.setString(4,rating);
	    		      stmt.setString(5,special_features);
	    		      stmt.setString(6,director);
	    		      stmt.setInt(7,language_id);
	    		      if(config.equalsIgnoreCase("Edit"))
	    		      {
	    		    	  stmt.setInt(8,film_id);
	    		      }

	    		      stmt.executeUpdate();   
	    		      b=true;
	    		      System.out.println("Record added successfully");
	    		    }
	    		   catch (Exception e) {
	    		      e.printStackTrace();
	    		    }  		
	    		   return b;
	    }
		public static boolean deleteData(String filmIds) throws Exception 
	    {
	    		   Connection conn = JdbcConnection.getConnectionInterface();
	    		   PreparedStatement p_stmt=null; 
	    		   Statement stmt=null;
	    		   boolean b=false;
	    		   
	    		   try
	    		   {
	    		      String sql,sql1,sql2;
	    		      stmt = conn.createStatement();
	    		      sql1="SET FOREIGN_KEY_CHECKS=OFF;";
	    		      stmt.executeQuery(sql1);
	  
	    		      sql="DELETE from film WHERE film_id IN ("+filmIds+")";
	    		      p_stmt=conn.prepareStatement(sql);
	    		      
	    		      p_stmt.executeUpdate();

	    		      sql2="SET FOREIGN_KEY_CHECKS=ON;";
	    		      stmt.executeQuery(sql2);
	    		      b=true;
	    		      System.out.println("Record deleted successfully");
	    		    } 
	    		   catch (Exception e) {
	    		      e.printStackTrace();
	    		    } 
	    		   return b;
	    }
		public static Map<String,Object> searchData(int start,int limit,String title,String release_year,String director,Integer language_id) throws Exception 
	    {
	    		   Connection conn = JdbcConnection.getConnectionInterface();
	    		   ResultSet rs,rs2;
	    		   LinkedList<Pojo> record=new LinkedList<>();
	    		   Map<String,Object> mapToJson=new HashMap<>();
	    		   PreparedStatement stmt=null;
	    		   PreparedStatement count_stmt=null;
	    		   int total=0;
	    		   boolean flagAND=false;
	    		String sqlParam=" WHERE ";
	    		
	    			if(title!="") {
	    				sqlParam=sqlParam+"title='"+title+"'";
	    				flagAND=true;
	    			}
	    			if(director!="") {
	    				if(flagAND) {
	    					sqlParam=sqlParam+" AND ";
	    				}
	    				sqlParam=sqlParam+"director='"+director+"'";
	    				flagAND=true;
	    			}

	    			if(release_year!="") {
	    				if(flagAND) {
	    					sqlParam=sqlParam+" AND ";
	    				}
	    				sqlParam=sqlParam+"release_year="+release_year;
	    				flagAND=true;
	    			}

	    			if(language_id!=null) {
	    				if(flagAND) {
	    					sqlParam=sqlParam+" AND ";
	    				}
	    				sqlParam=sqlParam+"film.language_id="+language_id;
	    				flagAND=true;
	    			}
	    		   
	    		   try
	    		   {

	    		      String sql,sql2;
	    		      sql="SELECT film_id,`title`,`description`,`release_year`,`rating`,`special_features`," + 
	    		      		"film.language_id,`director` ,`name` AS `language` FROM film JOIN `language` ON "
	    		      		+ "film.language_id=language.language_id"
	    		      		+ sqlParam +" LIMIT ?,?;";
	    		      sql2="SELECT COUNT(*) FROM film"+sqlParam;
	    		      stmt=conn.prepareStatement(sql);
	    		      stmt.setInt(1,start);
	    		      stmt.setInt(2,limit);	  
	    		      
	    		      rs = stmt.executeQuery();  
	    		      while(rs.next()){
	    				Pojo pojo_obj =new Pojo();
	    				pojo_obj.setFilm_id(rs.getInt("film_id"));
	    				pojo_obj.setTitle(rs.getString("film.title"));
	    				pojo_obj.setDescription(rs.getString("film.description"));
	    				pojo_obj.setRelease_year(rs.getString("film.release_year"));
	    				pojo_obj.setRating(rs.getString("film.rating"));
	    				pojo_obj.setLanguage_id(rs.getInt("film.language_id"));
	    				pojo_obj.setLanguage(rs.getString("language"));
	    				pojo_obj.setDirector(rs.getString("film.director"));
	    				pojo_obj.setSpecial_features(rs.getString("film.special_features"));
	    				record.add(pojo_obj);
	    				}
	    				
	      		      count_stmt=conn.prepareStatement(sql2);	 
	      		      rs2 = count_stmt.executeQuery(); 
	      		      
	    				if(rs2.next()) {
	          				total=rs2.getInt("COUNT(*)"); 
	          				}
	    				mapToJson.put("total",total);
	    				mapToJson.put("movies",record);   				
	    		   }
	    		   catch(Exception e) {
	    			   e.printStackTrace();
	    			   }
	   			 return mapToJson; 
	    		   }
	}
