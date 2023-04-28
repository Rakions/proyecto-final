# Conexion a base de datos
try{
            Class.forName("oracle.jdbc.OracleDriver");
        }catch(ClassNotFoundException ex){
            Logger.getLogger(ConexionBD.class.getName()).log(Level.SEVERE, null, ex);
        }

        String cadenaConexion = "jdbc:oracle:thin:@localhost:1521/XE";
        try{
            Connection conexion= DriverManager.getConnection(cadenaConexion,"HR","HR");
        }catch(SQLException ex){
            Logger.getLogger(ConexionBD.class.getName()).log(Level.SEVERE, null, ex);
        }
