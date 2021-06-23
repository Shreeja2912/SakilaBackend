package com.sakila.DAO;

import java.util.LinkedList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.service.ServiceRegistry;

import com.sakila.Connection.JdbcConnection;
import com.sakila.Model.*;


public class FilmDaoImpl implements FilmDao{
	Configuration con = new Configuration().configure().addAnnotatedClass(Film.class).addAnnotatedClass(Language.class);
	StandardServiceRegistryBuilder reg = new StandardServiceRegistryBuilder().applySettings(con.getProperties());
	ServiceRegistry serviceRegistry = reg.build();
	SessionFactory factory = con.buildSessionFactory(serviceRegistry);
	
	@SuppressWarnings("unchecked")
	public ArrayList<Pojo> retrievedata(int start,int limit) 
    {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		ArrayList<Pojo> record=new ArrayList<>();
		ArrayList<Pojo> results=new ArrayList<>();
		try {
			 	Criteria cr=null;
			    cr=session.createCriteria(Film.class);
			    cr.add(Restrictions.eq("is_Deleted", 0)).setFirstResult(start).setMaxResults(limit);
			    results=(ArrayList<Pojo>) cr.list();
//				Query query = session.createQuery("From Film").setFirstResult(start).setMaxResults(limit);
//				record = (ArrayList<Pojo>) query.list();
				t.commit();

			} catch (Exception e) {
				t.rollback();
				e.printStackTrace();
			} finally {
				session.close();
			}

			// return record;
		return results;
		}

	public int retrievedataCount() 
    {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		int record=0;
		try {
				String hql2 = "SELECT COUNT(*) FROM com.sakila.Model.Film where is_Deleted != 1";
//				String hql2 = "SELECT COUNT(*) FROM com.sakila.Model.Film";
				Query query2 = session.createQuery(hql2);
				Long total = (Long) query2.setMaxResults(1).uniqueResult();
				record=total.intValue();
				t.commit();

			} catch (Exception e) {
				t.rollback();
				e.printStackTrace();
			} finally {
				session.close();
			}
		return record;
    }
	
	public boolean addData(String config,int film_id,String title,String description,String release_year,
			String rating,String special_features,String director,int language_id) 
    {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
    		   boolean b=false;      
    		   try {
    			   Film row = new Film();
    			   row.setTitle(title);
    			   row.setDescription(description);
    			   row.setRelease_year(Integer.parseInt(release_year));
    			   row.setDirector(director);
    			   row.setRating(rating);
    			   row.setSpecial_features(special_features);
    			   row.setLanguage_id(language_id);
    			   row.setIs_Deleted(0);
    			   if(config.equalsIgnoreCase("Add"))
    				   session.save(row);
    			   else if(config.equalsIgnoreCase("Edit")) {
    				   row.setFilm_id(film_id);
    				   session.update(row);
    			   }// commit - execute - failsafe
    			   t.commit();
    			   session.close();
    			   b=true;
    			   System.out.println("Done addData");
    			   }catch (Exception e) {
    					e.printStackTrace();
    				}  
    		      System.out.println("Record added successfully");
    		      return b;
    }
	@SuppressWarnings("finally")
	public boolean deleteData(String filmIds) throws SQLException
    {
		SessionFactory factory = con.buildSessionFactory(serviceRegistry);
		Session session = factory.openSession();
		boolean b = false;
		Transaction t1 =null;
		try {
			t1= session.beginTransaction();
//			String sql1 = "SET FOREIGN_KEY_CHECKS=0;";
//			Query query1 = session.createSQLQuery(sql1);
//			query1.executeUpdate();
			Film row = new Film();
			String[] array = filmIds.split(",");
			for(String number:array)
			{
				int num=Integer.parseInt(number);
				String hql = "update com.sakila.Model.Film set is_Deleted = 1 where film_id in (:list)";
			    Query query = session.createQuery(hql);
			    query.setParameter("list", num);
			    query.executeUpdate();

//				Criteria cr = session.createCriteria(Film.class);
//		    	Film del = (Film) cr.add(Restrictions.eq("film_Id", num)).uniqueResult();
//				row.setIs_Deleted(1);
			    
//				row.setFilm_id(num);
			}
//			session.delete(row);
//			t1.commit();
//			String sql2 = "SET FOREIGN_KEY_CHECKS=1;";
//			Query query2 = session.createSQLQuery(sql2);
//			query2.executeUpdate();
			
			t1.commit();
			System.out.println("Done deleteData");
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			session.close();
			return b;
		}
	}
	public Map<String,Object> searchData(int start,int limit,String title,String release_year,
			String director,Integer language_id) 
    {
				Session session = factory.openSession();
				boolean b = false;
				Transaction t1 =null;
				Long count = null;
				t1= session.beginTransaction();
				Map<String,Object> mapToJson=new HashMap<String,Object>();
    		    List<Film> results=null;
    		    int total=0;
    		    try {
    			   Criteria cr=null;
    			   cr=session.createCriteria(Film.class);	   
    		
    			if(title!="") {
    				cr.add(Restrictions.like("title",title));
    			}
    			if(director!="") {
    				cr.add(Restrictions.like("director",director));
    			}

    			if(release_year!="") {
    				cr.add(Restrictions.like("release_year",Integer.parseInt(release_year)));
    			}

    			if(language_id!=null) {
    				cr.add(Restrictions.like("language_id",language_id));
    			}
    			Criteria c= cr;
    			cr.add(Restrictions.eq("is_Deleted", 0)).setFirstResult(start).setMaxResults(limit);
    			results=cr.list();
    			count = (Long) c.setProjection(Projections.rowCount()).uniqueResult();
    		   }
    		   catch(Exception e) {
    			   t1.rollback();
    			   e.printStackTrace();
   			   }finally{
       			mapToJson.put("success",true);
       			mapToJson.put("total",count);
       			mapToJson.put("movies",results);
   				   session.close();
   			   }
    		    return mapToJson;
    	}
// 		   Connection conn = JdbcConnection.getConnectionInterface();
// 		   ResultSet rs;
// 		   LinkedList<Pojo> record=new LinkedList<>();
// 		   // Map<String,Object> mapToJson=new HashMap<>();
// 		   PreparedStatement stmt=null;
// 		   
// 		   try
// 		   {
// 		      String sql;
// 		      sql="SELECT film_id,`title`,`description`,`release_year`,`rating`,`special_features`,film.language_id,"
// 		      		+ "`director`,`name` AS 'language' FROM film JOIN `language` "
// 		      		+ "ON film.language_id=language.language_id limit ?,?";
// 		      stmt=conn.prepareStatement(sql);
// 		      stmt.setInt(1,start);
// 		      stmt.setInt(2,limit);	      
// 		      rs = stmt.executeQuery();
// 		      
// 		     
// 				while(rs.next()){
// 				Pojo pojo_obj =new Pojo();
// 				pojo_obj.setFilm_id(rs.getInt("film_id"));
// 				pojo_obj.setTitle(rs.getString("film.title"));
// 				pojo_obj.setDescription(rs.getString("film.description"));
// 				pojo_obj.setRelease_year(rs.getString("film.release_year"));
// 				pojo_obj.setRating(rs.getString("film.rating"));
// 				pojo_obj.setLanguage_id(rs.getInt("film.language_id"));
// 				pojo_obj.setLanguage(rs.getString("language"));
// 				pojo_obj.setDirector(rs.getString("film.director"));
// 				pojo_obj.setSpecial_features(rs.getString("film.special_features"));
// 				record.add(pojo_obj);
// 				}
// 				// rs2=RetrieveData.retrievedataCount();
// 				// if(rs2.next()){
// 				// total=rs2.getInt("COUNT(*)");
// 				// }
// 				// mapToJson.put("success",true);
// 				// mapToJson.put("total",total);
// 				// mapToJson.put("movies",record);
// 		   }
// 		   catch(Exception e) {
// 			   e.printStackTrace();
// 			   }
//			 return record; 
// 		   }
//	public int retrievedataCount() 
//    {
//    		   Connection conn = JdbcConnection.getConnectionInterface();
//    		   ResultSet rs=null;
//    		   PreparedStatement stmt=null;
//    		   int total=0;
//    		   try
//    		   {
//    		      
//    		      String sql2 = "SELECT COUNT(*) FROM film";
//    		      stmt=conn.prepareStatement(sql2);
//    		      rs = stmt.executeQuery();
//    		      if(rs.next())
//      				 total=rs.getInt("COUNT(*)"); 				 
//    		   }
//    		   catch(Exception e) {
//    			   e.printStackTrace();
//    			   }
//    		  
//   			 return total; 
//    }
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
	 */
//	public boolean addData(String config,int film_id,String title,String description,String release_year,
//			String rating,String special_features,String director,int language_id) 
//    {
//    		   Connection conn = JdbcConnection.getConnectionInterface();
//    		   PreparedStatement stmt=null;
//    		   boolean b=false;
//    		   try
//    		   {
//    		      String sql=null;
//    		      if(config.equalsIgnoreCase("Add"))
//    		      sql="Insert into film (title,description,release_year,rating,"
//    		      		+ "special_features,director,language_id) values(?,?,?,?,?,?,?)";
//    		      else if(config.equalsIgnoreCase("Edit"))
//    		      {
//    		    	  sql="Update film set title=?,description=?,release_year=?,rating=?,"
//    	    		      		+ "special_features=?,director=?,language_id=? where film_id=?";
//    		      }
//    		    	  
//    		      stmt=conn.prepareStatement(sql);
//    		      stmt.setString(1,title);	  
//    		      stmt.setString(2,description);
//    		      stmt.setString(3,release_year);
//    		      stmt.setString(4,rating);
//    		      stmt.setString(5,special_features);
//    		      stmt.setString(6,director);
//    		      stmt.setInt(7,language_id);
//    		      if(config.equalsIgnoreCase("Edit"))
//    		      {
//    		    	  stmt.setInt(8,film_id);
//    		      }
//
//    		      stmt.executeUpdate();   
//    		      b=true;
//    		      System.out.println("Record added successfully");
//    		    }
//    		   catch (Exception e) {
//    		      e.printStackTrace();
//    		    }  		
//    		   return b;
//    }
//	public boolean deleteData(String filmIds) throws SQLException
//    {
//    		   Connection conn = JdbcConnection.getConnectionInterface();
//    		   PreparedStatement p_stmt=null; 
//    		   Statement stmt=null;
//    		   boolean b=false;
//    		   
//    		   try
//    		   {
//    		      String sql,sql1,sql2;
//    		      stmt = conn.createStatement();
//    		      sql1="SET FOREIGN_KEY_CHECKS=OFF;";
//    		      stmt.executeQuery(sql1);
//  
//    		      sql="DELETE from film WHERE film_id IN ("+filmIds+")";
//    		      p_stmt=conn.prepareStatement(sql);
//    		      
//    		      p_stmt.executeUpdate();
//
//    		      sql2="SET FOREIGN_KEY_CHECKS=ON;";
//    		      stmt.executeQuery(sql2);
//    		      b=true;
//    		      System.out.println("Record deleted successfully");
//    		    } 
//    		   catch (Exception e) {
//    		      e.printStackTrace();
//    		    } 
//    		   return b;
//    }
//	public Map<String,Object> searchData(int start,int limit,String title,String release_year,String director,Integer language_id) 
//    {
//    		   Connection conn = JdbcConnection.getConnectionInterface();
//    		   ResultSet rs,rs2;
//    		   LinkedList<Pojo> record=new LinkedList<>();
//    		   Map<String,Object> mapToJson=new HashMap<>();
//    		   PreparedStatement stmt=null;
//    		   PreparedStatement count_stmt=null;
//    		   int total=0;
//    		   boolean flagAND=false;
//    		String sqlParam=" WHERE ";
//    		
//    			if(title!="") {
//    				sqlParam=sqlParam+"title='"+title+"'";
//    				flagAND=true;
//    			}
//    			if(director!="") {
//    				if(flagAND) {
//    					sqlParam=sqlParam+" AND ";
//    				}
//    				sqlParam=sqlParam+"director='"+director+"'";
//    				flagAND=true;
//    			}
//
//    			if(release_year!="") {
//    				if(flagAND) {
//    					sqlParam=sqlParam+" AND ";
//    				}
//    				sqlParam=sqlParam+"release_year="+release_year;
//    				flagAND=true;
//    			}
//
//    			if(language_id!=null) {
//    				if(flagAND) {
//    					sqlParam=sqlParam+" AND ";
//    				}
//    				sqlParam=sqlParam+"film.language_id="+language_id;
//    				flagAND=true;
//    			}
//    		   
//    		   try
//    		   {
//
//    		      String sql,sql2;
//    		      sql="SELECT film_id,`title`,`description`,`release_year`,`rating`,`special_features`," + 
//    		      		"film.language_id,`director` ,`name` AS `language` FROM film JOIN `language` ON "
//    		      		+ "film.language_id=language.language_id"
//    		      		+ sqlParam +" LIMIT ?,?;";
//    		      sql2="SELECT COUNT(*) FROM film"+sqlParam;
//    		      stmt=conn.prepareStatement(sql);
//    		      stmt.setInt(1,start);
//    		      stmt.setInt(2,limit);	  
//    		      
//    		      rs = stmt.executeQuery();  
//    		      while(rs.next()){
//    				Pojo pojo_obj =new Pojo();
//    				pojo_obj.setFilm_id(rs.getInt("film_id"));
//    				pojo_obj.setTitle(rs.getString("film.title"));
//    				pojo_obj.setDescription(rs.getString("film.description"));
//    				pojo_obj.setRelease_year(rs.getString("film.release_year"));
//    				pojo_obj.setRating(rs.getString("film.rating"));
//    				pojo_obj.setLanguage_id(rs.getInt("film.language_id"));
//    				pojo_obj.setLanguage(rs.getString("language"));
//    				pojo_obj.setDirector(rs.getString("film.director"));
//    				pojo_obj.setSpecial_features(rs.getString("film.special_features"));
//    				record.add(pojo_obj);
//    				}
//    				
//      		      count_stmt=conn.prepareStatement(sql2);	 
//      		      rs2 = count_stmt.executeQuery(); 
//      		      
//    				if(rs2.next()) {
//          				total=rs2.getInt("COUNT(*)"); 
//          				}
//    				mapToJson.put("total",total);
//    				mapToJson.put("movies",record);   				
//    		   }
//    		   catch(Exception e) {
//    			   e.printStackTrace();
//    			   }
//   			 return mapToJson; 
//    		   }
}
