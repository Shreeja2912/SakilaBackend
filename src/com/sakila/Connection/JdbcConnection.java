package com.sakila.Connection;
import java.sql.Connection;
import java.sql.DriverManager;

	public class JdbcConnection {
		static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";  
		static final String DB_URL = "jdbc:mysql://localhost:3306/sakila";
		
	//  Database credentials
		static final String USER = "root";
		static final String PASS = "root";
		private static Connection conn = null;
		static {
			try
			{
//				STEP 2: Register JDBC driver
				Class.forName(JDBC_DRIVER).newInstance();
				
//				STEP 3: Open a connection
				System.out.println("Connecting to database...");
				conn = DriverManager.getConnection(DB_URL,USER,PASS);
		   }
		   catch(Exception e) {
		      e.printStackTrace();
		   }
		}	
		public static Connection getConnectionInterface() {
			return conn;
		}

	}
