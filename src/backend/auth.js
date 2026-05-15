import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL;

const supabaseKey =
  import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export async function login(
  email,
  password
) {

  try {
    console.log(supabaseUrl);
    const { data, error } =
      await supabase
        .from("user")
        .select(
          "id, email, name, description, password"
        )
        .eq("email", email)
        .single();

    if (error || !data) {

      return {
        success: false,
        message: "Credenciais inválidas"
      };
    }

    if (
      data.password !== password
    ) {

      return {
        success: false,
        message: "Credenciais inválidas"
      };
    }

    const session = {

      id: data.id,

      email: data.email,

      name: data.name,

      description:
        data.description,

      expiresAt:
        Date.now()
        + 1000
        * 60
        * 60
        * 24
        * 3
    };

    localStorage.setItem(
      "session",
      JSON.stringify(session)
    );

    window.location.href = "/";

    return {
      success: true,
      session
    };

  } catch (err) {

    return {
      success: false,
      message: "Erro inesperado"
    };
  }
}

export async function createUser(
  name,
  email,
  password,
  description
) {

  try {

    const {
      data: existingUser,
      error: findError
    } = await supabase
      .from("user")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (findError) {

      return {
        success: false,
        message:
          "Erro ao verificar usuário"
      };
    }

    if (existingUser) {

      return {
        success: false,
        message:
          "Já existe um usuário com esse email"
      };
    }

    const { data, error } =
      await supabase
        .from("user")
        .insert({
          name,
          email,
          password,
          description,
          created_at:
            new Date().toISOString()
        })
        .select(
          "id, name, email, description, created_at"
        )
        .single();

    if (error) {

      return {
        success: false,
        message:
          "Erro ao criar usuário"
      };
    }

    /*
      CRIA SESSÃO AUTOMÁTICA
    */

    const session = {

      id: data.id,

      email: data.email,

      name: data.name,

      description:
        data.description,

      expiresAt:
        Date.now()
        + 1000
        * 60
        * 60
        * 24
        * 3
    };

    localStorage.setItem(
      "session",
      JSON.stringify(session)
    );

    /*
      REFRESH PAGE
    */

    window.location.href = "/";

    return {
      success: true,
      user: data
    };

  } catch (err) {

    return {
      success: false,
      message: "Erro inesperado"
    };
  }
}

export function getSession() {

  const raw =
    localStorage.getItem(
      "session"
    );

  if (!raw) return null;

  try {

    const session =
      JSON.parse(raw);

    if (
      !session.expiresAt
      || Date.now() > session.expiresAt
    ) {

      localStorage.removeItem(
        "session"
      );

      return null;
    }

    return session;

  } catch {

    localStorage.removeItem(
      "session"
    );

    return null;
  }
}

export function logout() {

  localStorage.removeItem(
    "session"
  );

  /*
    REFRESH PAGE
  */

  window.location.href = "/login";
}