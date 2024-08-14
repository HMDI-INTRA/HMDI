using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Windows.Forms;
using System.IO;
using System.Data.Common;

namespace EasyInnerSDK.DAO
{
    class DAOConexao
    {
        private static string ConnectionString = "Server=10.1.1.111;Database=TopAcesso;User Id=sa;Password=zfNjHffYk8rjc;";
        public static DbConnection Conn = null;

        public static DbConnection ConectarBase()
        {
            try
            {
                if (Conn == null)
                {
                    Conn = new SqlConnection(ConnectionString);
                }
                if (Conn.State == System.Data.ConnectionState.Closed)
                {
                    Conn.Open();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return Conn;
        }

        public static SqlParameter ReturnParametro(object valor)
        {
            SqlParameter Parametro = new SqlParameter();
            switch (valor.GetType().FullName)
            {
                case "System.Int32":
                    Parametro.DbType = System.Data.DbType.Int32;
                    break;
                case "System.String":
                    Parametro.DbType = System.Data.DbType.String;
                    break;
                case "System.Boolean":
                    Parametro.DbType = System.Data.DbType.Boolean;
                    break;
            }
            Parametro.Value = valor;
            return Parametro;
        }
    }
}
