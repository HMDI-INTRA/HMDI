<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'intranet' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'Ln!4343@Cid' );
 
/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'oY=mx|D-}yMn=c}4TysKL&64xUD.FM_99Okmi6/k0,L&V!d5JeqeLlswX4g66V9u' );
define( 'SECURE_AUTH_KEY',  '{8dH-ICib=qLz^v8`_,7FXdf51Eo:^lwb?_8)C+W/_%CFJjq-pj/g5Q#)cd9l=YD' );
define( 'LOGGED_IN_KEY',    'M#xRnt(4-#zI$H:%tK7i;YT8p^^_!QfzH)F.gv?Zg@YuqoV-d@bHVpgAAV=%biy6' );
define( 'NONCE_KEY',        'vu.-9@OeI3B|id6d}wWQoYi`7(F|>`Z~YRsi_#&K%0[8e>q:gd:*C5y(%%cELoTd' );
define( 'AUTH_SALT',        'Z_Di$TNw:68@6?fm_S]R~V30nH?=#zu$4oDZMG@hd*G_dy$OF^tHEW_WF0`_ 586' );
define( 'SECURE_AUTH_SALT', 'Wq_m9fInw){dTbzcX-i+Tmm 2QlzkSr eG2U.ASO|C BK`0dh4)S;*:|GG=VE[t:' );
define( 'LOGGED_IN_SALT',   '{^6Oz}|rXN4cabl.?Gx8qlY).(/Ij}Q/C__DnVvfP-KzKrf)!.]j>YU (%^0]r:o' );
define( 'NONCE_SALT',       'TgKU[9Ec44#BVpP;A->@(:jy%$!<x,b1&.MAnv&I<xM;Mrzqsu] 3JNFm0m(IG.C' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

define('FS_METHOD', 'direct');

define('WP_MEMORY_LIMIT', '500M');


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
